"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ExternalCountryResponse } from "@/app/drink/_type/drink";

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,translations,cca2,continents,flags";

/**
 * 1. 외부 API 동기화 (Sync)
 * PHP의 updateAdminDrinkCountry 로직을 이식
 */
export async function syncCountriesAction() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) throw new Error(`API 호출 실패: ${response.status}`);

    const countries: ExternalCountryResponse[] = await response.json();

    // 트랜잭션을 사용하여 데이터 일괄 처리 (성능 및 안정성)
    const upsertPromises = countries.map((country) => {
      const nameKo = country.translations?.kor?.common || country.name.common;
      const nameEn = country.name.common;
      const isoCode = country.cca2;
      const continent = country.continents?.[0] || "";
      const flagPath = country.flags.svg || country.flags.png;

      return db.drinkCountry.upsert({
        where: { isoCode: isoCode },
        update: {
          nameKo,
          continent,
          flagPath,
        },
        create: {
          nameKo,
          nameEn,
          isoCode,
          continent,
          flagPath,
          listOrder: 0,
          status: "active",
        },
      });
    });

    await db.$transaction(upsertPromises);

    //revalidatePath("/drink"); // 페이지 데이터 갱신
    return { success: true, message: `${countries.length}건 동기화 완료` };
  } catch (error: any) {
    console.error("Sync Error:", error);
    return { success: false, message: error.message || "동기화 중 오류 발생" };
  }
}

/**
 * 2. 국가 정보 수정 (Update)
 */
export async function updateCountryAction(
  id: number,
  data: { nameKo: string; status: string },
) {
  try {
    await db.drinkCountry.update({
      where: { countryId: id },
      data: {
        nameKo: data.nameKo,
        status: data.status,
      },
    });

    revalidatePath("/drink");
    return { success: true, message: "수정되었습니다." };
  } catch (error) {
    return { success: false, message: "수정 실패" };
  }
}

/**
 * 3. 국가 정보 삭제 (Delete)
 */
export async function deleteCountryAction(id: number) {
  try {
    await db.drinkCountry.delete({
      where: { countryId: id },
    });

    revalidatePath("/drink");
    return { success: true, message: "삭제되었습니다." };
  } catch (error) {
    return { success: false, message: "삭제 실패" };
  }
}

export async function getCountries() {
  try {
    const countries = await db.drinkCountry.findMany({
      where: {
        status: "active", // 활성화된 국가만 필터링
      },
      orderBy: {
        nameKo: "asc", // 한글명 기준 가나다순 정렬
      },
    });
    return countries;
  } catch (error) {
    console.error("국가 목록 조회 에러:", error);
    return [];
  }
}

export async function getCountryById(countryId: number) {
  try {
    const country = await db.drinkCountry.findUnique({
      where: { countryId },
    });
    return country;
  } catch (error) {
    console.error(`국가 상세 조회 에러 (ID: ${countryId}):`, error);
    return null;
  }
}

/**
 * 3. 국가 정보 수정/업데이트
 */
export async function updateCountry(
  countryId: number,
  data: { nameKo: string; nameEn?: string; status?: string },
) {
  try {
    await db.drinkCountry.update({
      where: { countryId },
      data,
    });
    revalidatePath("/drink/producer"); // 증류소 페이지 등 관련 페이지 갱신
    return { success: true };
  } catch (error) {
    console.error("국가 정보 수정 에러:", error);
    return { success: false, error: "국가 정보 수정에 실패했습니다." };
  }
}
