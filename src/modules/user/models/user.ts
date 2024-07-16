'use server';

import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { decodeJwt } from 'jose';
import { PrismaClient } from "@prisma/client";

interface UserListParams {
  page: number | null
  keyword: string | null
  target: string | null
}

interface UserParams {
  id? : number | null
  uuid? : string | null
  email? : string | null
  nickname? : string | null
}

interface LoggedParams {
  email : string
  isAdmin? : boolean
}

export const getUser = async (params:UserParams) => {
  const prisma = new PrismaClient();
  const accessToken = cookies().get('accessToken')?.value
  let obj: any = {};
  let loggedInfo:LoggedParams = {
    email : ''
  }
  let userInfo
  let response
  if(accessToken) {
    const decodeToken:{ id:string, isAdmin:boolean } = await decodeJwt(accessToken);
    loggedInfo.email = decodeToken.id
  }
  params.id && (obj.id = params.id)
  params.uuid && (obj.uuid = params.uuid).trim()

  if(!obj.id && !obj.uuid && !obj.nickname && !obj.email) {
    obj.email = loggedInfo.email
  }

  try {
    userInfo = await prisma.user.findUnique({
      where: obj,
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
      }
    });
  } catch (e) {
    console.log('getUser error' + e)
    response = {
      success: true,
      data: {
        code: "error",
        message : '회원정보가 없습니다.'
      }
    };
  }
  response = {
    data: userInfo
  };
  return response
}

export const getUserList = async (params:UserListParams) => {
  const prisma = new PrismaClient();
  const { page, target, keyword } = params;

  const currentPage = page; // 현재 페이지
  const listCount = 20; // 페이지당 항목 수
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
  const returnData = {
    userList : userList,
    navigation : {
      totalCount : totalItems,
      totalPages : totalPages,
      page : currentPage,
      listCount : listCount
    }
  }
  // const result = await userList?.json()
  return returnData
}

export const getUserByEmail = async (email:string) => {
  const prisma = new PrismaClient();
  let userInfo
  let response
  try {
    userInfo = await prisma.user.findUnique({
      where: { email: email },
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
      }
    });
  } catch (e) {
    console.log('getUser error' + e)
    response = {
      success: true,
      data: {
        code: "error",
        message : '회원정보가 없습니다.'
      }
    };
  }
  response = {
    data: userInfo
  };
  return response
}

export const getUserByNickname = async (nickname:string) => {
  const prisma = new PrismaClient();
  let userInfo
  let response
  try {
    userInfo = await prisma.user.findUnique({
      where: { nickname: nickname },
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
      }
    });
  } catch (e) {
    console.log('getUser error' + e)
    response ={
      success: true,
      data: {
        code: "error",
        message : '회원정보가 없습니다.'
      }
    };
  }
  response = {
    data: userInfo
  };
  return response
}
export const getUserByToken = async (token) => {
  const prisma = new PrismaClient();
  let userInfo
  let response
  const accessToken = cookies().get('accessToken')?.value
  
  if (!accessToken) {
    response =  NextResponse.json({
      success: true,
      data: {
        code: "fail",
        message : 'accessToken Error'
      }
    },
    {
      status: 200,
    },);
  } else {
    const decodeToken:{ id:string, isAdmin:boolean } = await decodeJwt(accessToken);
    if (!decodeToken || !decodeToken.id) {
      response = NextResponse.json({
        success: true,
        data: {
          code: "fail",
          message: 'Invalid accessToken'
        }
      }, {
          status: 200,
      });
    } else {
      userInfo = await prisma.user.findUnique({
        where: { email: decodeToken.id },
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
        }
      });

      if(!userInfo) {
        response = NextResponse.json(
          {
            success: true,
            data: {
              code: "fail",
              message : '회원정보가 없습니다.'
            }
          },
          {
            status: 200,
          },
        );
      }else{

        response = NextResponse.json(
          {
            success: true,
            data: userInfo
          },
          {
            status: 200,
          },
        );
      }
    }
  }
  response = NextResponse.json(
    {
      success: true,
      data: userInfo
    },
    {
      status: 200,
    },
  );
  // const nowPasswordValue = request.get('nowPasswordValue') as string;
  // console.log(nowPasswordValue)
  return response
}

