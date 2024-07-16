'use server';

import { PrismaClient } from "@prisma/client";
interface UserListParams {
  page: number | null
  keyword: string | null
  target: string | null
}
export const getUserList = async (params:UserListParams) => {
  const prisma = new PrismaClient();
  const { page, target, keyword } = params;

  const currentPage = page; // 현재 페이지
  const listCount = 3; // 페이지당 항목 수
  const skipAmount = currentPage && (currentPage - 1) * listCount;

  const totalItems = await prisma.user.count();
  const totalPages = Math.ceil(totalItems / listCount);

  const where: any = {};
    if (target && keyword) {
      where[target as string] = { contains: keyword };
    }

  const userList = await prisma.user.findMany({
    skip: skipAmount && skipAmount >= 0 ? skipAmount : 0,
    take: listCount,
    where,
    select: {
      id: true,
      uuid: true,
      email: true,
      password: true,
      nickname: true,
      createdAt: true,
      updateAt:true,
      isAdmin:true,
      isManagers:true
    },
    orderBy: {
      id: 'desc',
    },
  });
  console.log(userList)
  const returnData = {
    userList : userList,
    navigation : {
      totalCount : totalItems,
      totalPages : totalPages,
      page : currentPage,
      listCount : listCount
    }
  }
  console.log(returnData)
  // const result = await userList?.json()
  return returnData
}
