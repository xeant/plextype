"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function getCategoryTree() {
  try {
    const categories = await db.drinkCategory.findMany({
      orderBy: { listOrder: 'asc' },
    });

    // 평면 데이터를 트리 구조로 변환
    const buildTree = (parentId: number = 0): any[] => {
      return categories
        .filter((cat) => cat.parentId === parentId)
        .map((cat) => ({
          ...cat,
          children: buildTree(cat.categoryId),
        }));
    };

    return buildTree(0);
  } catch (error) {
    console.error("Failed to fetch category tree:", error);
    return [];
  }
}



// 카테고리 수정
export async function updateCategory(id: number, data: { name: string; description?: string }) {
  try {
    await db.drinkCategory.update({
      where: { categoryId: id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    revalidatePath("/drink/category"); // 데이터 갱신
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: "수정에 실패했습니다." };
  }
}

// 카테고리 삭제
export async function deleteCategory(id: number) {
  try {
    // 하위 카테고리가 있는지 확인
    const hasChildren = await db.drinkCategory.findFirst({
      where: { parentId: id },
    });

    if (hasChildren) {
      return { success: false, error: "하위 카테고리가 있어 삭제할 수 없습니다." };
    }

    await db.drinkCategory.delete({
      where: { categoryId: id },
    });
    revalidatePath("/drink/category");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "삭제 중 오류가 발생했습니다." };
  }
}

