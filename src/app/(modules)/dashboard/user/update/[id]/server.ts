'use server'

import { PrismaClient } from "@prisma/client";

interface UserInfo {
  id: number,
  email: string,
  nickname: string,
  password: string,
  isAdmin: boolean,
}
export const getUserInfo = async (id:number) => {
  const prisma = new PrismaClient();
  
  if (!id) {
    throw new Error('id is required')
  }
  console.log(id)
  const userInfo = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      password: true,
      isAdmin: true,
    },
  })
  console.log(userInfo)
  return userInfo
}

export const updateUserInfo = async(formData: FormData) => {
  const prisma = new PrismaClient();
  const id = parseInt(formData.get("id") as string);
  const email = formData.get("email") as string;
  const nickname = formData.get("nickname") as string;
  const password = formData.get("password") as string;
  const isAdmin = formData.get("isAdmin") === "true"; // Convert string to boolean;

  if (!id) {
    throw new Error('id is required')
  }
  const userInfo = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: email,
      nickname: nickname,
      password: password,
      isAdmin: isAdmin,
    },
  })

  return userInfo
}


