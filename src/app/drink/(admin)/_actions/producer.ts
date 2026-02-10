"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * 1. 증류소 정보 저장 및 수정 (Upsert)
 */
export async function upsertProducer(data: any) {
  try {
    const {
      producerId,
      nameKo,
      nameEn,
      countryId,
      region,
      address,
      lat,
      lng,
      mapUrl,
      description,
      status,
      homepage,
      mapType,
    } = data;

    // 위도와 경도를 하나의 문자열로 합침 (스키마의 latlng 필드 대응)
    const combinedLatLng = lat && lng ? `${lat},${lng}` : null;

    const payload = {
      nameKo,
      nameEn,
      countryId: countryId ? Number(countryId) : 0,
      region: region || null,
      address: address || null,
      latlng: combinedLatLng,
      mapUrl: mapUrl || null,
      mapType: mapType || "google",
      homepage: homepage || null,
      description: description || null,
      status: status || "active",
    };

    if (producerId) {
      // 수정
      await db.drinkProducer.update({
        where: { producerId: Number(producerId) },
        data: {
          ...payload,
          updatedAt: new Date(),
        },
      });
    } else {
      // 생성
      await db.drinkProducer.create({
        data: payload,
      });
    }

    revalidatePath("/drink/producer");
    return { success: true };
  } catch (error: any) {
    console.error("증류소 저장 에러:", error);
    return { success: false, error: error.message || "저장 중 오류 발생" };
  }
}

/**
 * 2. 증류소 목록 가져오기 (이게 없어서 에러 났던 것)
 */
export async function getProducers() {
  try {
    const producers = await db.drinkProducer.findMany({
      include: {
        country: true,
      },
      orderBy: {
        regdate: "desc", // 최신 등록순
      },
    });
    return producers;
  } catch (error) {
    console.error("증류소 목록 조회 에러:", error);
    return [];
  }
}

/**
 * 3. 증류소 삭제 (이것도 포함)
 */
export async function deleteProducer(producerId: number) {
  try {
    await db.drinkProducer.delete({
      where: { producerId: Number(producerId) },
    });
    revalidatePath("/drink/producer");
    return { success: true };
  } catch (error) {
    console.error("증류소 삭제 에러:", error);
    return { success: false, error: "삭제 중 오류가 발생했습니다." };
  }
}
