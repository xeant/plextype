'use server'

import { PrismaClient } from '@prisma/client';
import { decodeJwt } from 'jose';

interface LoggedParams {
  email : string
  isAdmin? : boolean | null
}

export const createPosts = async (token:string | null, formData:FormData) => {
  const prisma = new PrismaClient();
  let loggedInfo:LoggedParams = {
    email : '',
    isAdmin : false 
  }
  let response

  if(token) {
    const decodeToken:{ id:string, isAdmin:boolean } = await decodeJwt(token);
    loggedInfo.email = decodeToken.id
    loggedInfo.isAdmin = decodeToken.isAdmin
  }else{
    return response = 
      {
        success: true,
        data: {
          code: "fail",
          message : '토큰 정보가 잘못되었습니다.'
        }
      }
  }
  if(!loggedInfo.isAdmin) {
    return response = 
      {
        success: true,
        data: {
          code: "fail",
          message : '관리자 권한이 없습니다.'
        }
      }
  }
  const moduleId = formData.get('moduleId') as string;
  const moduleName = formData.get('moduleName') as string;
  const moduleType = formData.get('moduleType') as string;
  const moduleConfig: {
    listCount: string;
    pageCount: string;
    documentLike: string;
    consultingState: string;
    commentState: string;
    commentLike: string;
  } = {
    listCount: (formData.get('listCount') as string | null) ?? '0',
    pageCount: (formData.get('pageCount') as string | null) ?? '0',
    documentLike: formData.get('documentLike') as string ?? '',
    consultingState: formData.get('consultingState') as string ?? '',
    commentState: formData.get('commentState') as string ?? '',
    commentLike: formData.get('commentLike') as string ?? '',
  };
  await prisma.module.create({
    data: {
      moduleId : moduleId,
      moduleName : moduleName,
      moduleType : moduleType,
      config : moduleConfig
    }
  })
  console.log(moduleType);
  console.log(moduleName);



  return response
}