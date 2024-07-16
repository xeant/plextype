'use server';

import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { decodeJwt } from 'jose';
import { PrismaClient } from "@prisma/client";

interface PostsParams {
  id? : number | null
  accessToken? : string | null
}

interface LoggedParams {
  email : string
  isAdmin? : boolean
}

export const getPost = async (params:PostsParams) => {
  const prisma = new PrismaClient();
  let response

  return response
}

export const getPostList = async (params) => {
  const accessToken = cookies().get('accessToken')?.value
  const prisma = new PrismaClient();

  let response
  let postList
  let loggedInfo:LoggedParams = {
    email : ''
  }

  const { page, target, keyword } = params;

  const currentPage = page; // 현재 페이지
  const listCount = 20; // 페이지당 항목 수
  const skipAmount = currentPage && (currentPage - 1) * listCount;

  const totalItems = await prisma.module.count();
  console.log('totalItems', totalItems)
  const totalPages = Math.ceil(totalItems / listCount);

  const where: any = {};
  if (target && keyword) {
    where[target as string] = { contains: keyword };
  }


  if(!accessToken) {
    return response = {
      success: true,
      data: {
        code: "error",
        message : 'accessToken is required.'
      }
    }
  }

  const decodeToken:{ id:string, isAdmin:boolean } = await decodeJwt(accessToken);
  loggedInfo.email = decodeToken.id
  loggedInfo.isAdmin = decodeToken.isAdmin
  
  try {
    postList = await prisma.module.findMany({
      skip: skipAmount && skipAmount >= 0 ? skipAmount : 0,
      take: listCount,
      where,
      orderBy: {
        id: 'desc',
      },
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

  const returnData = {
    success: true,
    data: {
      code : 'success',
      postList : postList,
      navigation : {
        totalCount : totalItems,
        totalPages : totalPages,
        page : currentPage,
        listCount : listCount
      }
    }
  }

  return returnData
}

export const getDocument = async (params) => {
  const prisma = new PrismaClient();
  let response

  return response
}