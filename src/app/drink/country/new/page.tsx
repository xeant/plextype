import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default function NewCountryPage() {
  // 폼 제출을 처리하는 Server Action
  async function createCountry(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const isoCode = formData.get("isoCode") as string;

    if (!name) return;

    // DB에 저장
    await prisma.drinkCountry.create({
      data: {
        name,
        isoCode: isoCode?.toUpperCase() || null,
      },
    });

    // 등록 후 목록 페이지나 이전 페이지로 이동
    redirect("/drink");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">🌍 새 나라 등록</h1>
      
      <form action={createCountry} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">나라 이름</label>
          <input
            name="name"
            type="text"
            placeholder="예: 대한민국, 스코틀랜드"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ISO 코드 (선택)</label>
          <input
            name="isoCode"
            type="text"
            placeholder="예: KR, UK"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          등록하기
        </button>
      </form>
    </div>
  );
}