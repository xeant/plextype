"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCategoryTree() {
  try {
    const categories = await db.drinkCategory.findMany({
      orderBy: { listOrder: "asc" },
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

/**
 * 새로운 카테고리 생성
 */
// 카테고리 생성 시 description 추가
export async function createCategory(data: { name: string; parentId?: number; description?: string }) {
  try {
    const parentId = data.parentId || 0;
    let newCategoryId: number;

    const lastRoot = await db.drinkCategory.findFirst({
      where: { parentId: 0 },
      orderBy: { categoryId: "desc" },
    });

    if (parentId === 0) {
      newCategoryId = lastRoot ? lastRoot.categoryId + 1 : 1;
    } else {
      const lastChild = await db.drinkCategory.findFirst({
        where: { parentId: parentId },
        orderBy: { categoryId: "desc" },
      });
      newCategoryId = lastChild ? lastChild.categoryId + 1 : parentId * 100;
    }

    await db.drinkCategory.create({
      data: {
        categoryId: newCategoryId,
        name: data.name,
        parentId: parentId,
        description: data.description, // 설명 추가
        listOrder: newCategoryId,
      },
    });
    revalidatePath("/drink/category");
    return { success: true };
  } catch (error) {
    return { success: false, error: "생성 실패" };
  }
}

// 카테고리 수정 (ID, 이름, 설명, 부모 모두 변경 가능)
export async function updateCategory(
  id: number,
  data: {
    newId?: number;
    name: string;
    description?: string;
    parentId?: number;
  }
) {
  try {
    await db.drinkCategory.update({
      where: { categoryId: id },
      data: {
        categoryId: data.newId, // ID 수정 반영
        name: data.name,
        description: data.description,
        parentId: data.parentId,
      },
    });
    revalidatePath("/drink/category");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "수정 중 오류가 발생했습니다. (ID 중복 체크 필요)",
    };
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
      return {
        success: false,
        error: "하위 카테고리가 있어 삭제할 수 없습니다.",
      };
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
