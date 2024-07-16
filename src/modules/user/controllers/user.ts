'use server';
import { cookies, headers } from "next/headers";

import { decodeJwt } from 'jose';
import { PrismaClient } from "@prisma/client";
import { hashedPassword, verifyPassword } from "@plextype/utils/auth/password";
import { getUser, getUserByNickname } from "src/modules/user/models/user";

interface UserParams {
  id? : number | null
  uuid? : string | null
  email? : string | null
  accessToken? : string | null
  nickname? : string | null
}

interface LoggedParams {
  email : string
  isAdmin? : boolean | null
}

export const createUser = async (formData: FormData) => {
  const prisma = new PrismaClient();
  let userInfo
  let response

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nickname = formData.get('nickname') as string;
  if (!email) {
    return response = {
      success: true,
      data: {
        code: "error",
        element: 'email',
        message : '이메일 값은 필수입니다.'
      }
    };
  }
  if (!password) {
    return response ={
      success: true,
      data: {
        code: "error",
        element: 'password',
        message : '패스워드 값은 필수입니다.'
      }
    };
  }
  if (!nickname) {
    return response = {
      success: true,
      data: {
        code: "error",
        element: 'nickname',
        message : '닉네임 값은 필수입니다.'
      }
    };
  }

  const getUserEmail = await getUser({email: email})
  if(getUserEmail.data) {
    return response = 
      {
        success: true,
        data: {
          code: "fail",
          message : '이미 가입된 이메일입니다.'
        }
      }
  }
  
  const getUserNickname = await getUser({nickname: nickname})
  if(getUserNickname.data) {
    return response = 
      {
        success: true,
        data: {
          code: "fail",
          message : '이미 사용중인 닉네임입니다.'
        }
      }
  }

  try {
    userInfo = await prisma.user.create({
      data: {
        email: email,
        password: await hashedPassword(password),
        nickname: nickname,
      }
    })
  } catch (e) {
    console.log('register error' + e)
      throw {
        success: false,
        data: {
          code: "fail",
          message : '회원가입 과정에서 문제가 발생하였습니다.'
        }
      };
  }
  
}
export const updateUser = async (params:UserParams) => {
  const prisma = new PrismaClient();
  const accessToken = cookies().get('accessToken')?.value
  let obj: any = {};
  let loggedInfo:LoggedParams = {
    email : '',
    isAdmin : false 
  }
  let userInfo
  let response
  console.log(params)
  if(accessToken) {
    const decodeToken:{ id:string, isAdmin:boolean } = await decodeJwt(accessToken);
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
  params.id && (obj.id = params.id)
  params.uuid && (obj.uuid = params.uuid).trim()
  params.nickname && (obj.nickname = params.nickname).trim()
  params.email && (obj.email = params.email).trim()

  if(!obj.id && !obj.uuid && !obj.nickname && !obj.email) {
    obj.email = loggedInfo.email
  }

  //관리자가 아닐경우 본인 계정만 삭제 가능
  if(!loggedInfo.isAdmin) {
    if(userInfo?.email !== loggedInfo.email) {
      return response = 
        {
          success: true,
          data: {
            code: "fail",
            message : '권한이 없습니다.'
          }
        }
    }
  }

  userInfo = await getUser(params)
  console.log('deleteUser ',userInfo)
  if(!userInfo) {
    response = 
      {
        success: true,
        data: {
          code: "fail",
          message : '회원정보가 없습니다.'
        }
      }
    }

  if(userInfo.data.nickname !== obj.nickname) {
    const getUserNickname = await getUserByNickname(obj.nickname)
    console.log(getUserNickname)
    if(getUserNickname.data) {
      return response = 
        {
          success: true,
          data: {
            code: "error",
            message : '이미 사용중인 닉네임입니다.'
          }
        }
    }
  }
  console.log(obj);
  try {
    const updateUserInfo = await prisma.user.update({
      where: {
        id: userInfo.data.id
      },
      data: {
        nickname: obj.nickname,
        // password: obj.password,
      }
    })
    console.log(updateUserInfo)
    userInfo.nickname = updateUserInfo.nickname;
    return response = 
      {
        success: true,
        data: {
          code: "success",
          userInfo : userInfo,
          message : '회원정보가 성공적으로 변경되었습니다.'
        }
      }
      
  } catch (error) {
    console.error('userInfo update error' + error);
  }
}

export const deleteUser= async (params:UserParams) => {
  const prisma = new PrismaClient();
  const accessToken = cookies().get('accessToken')?.value
  let obj: any = {};
  let loggedInfo:LoggedParams = {
    email : '',
    isAdmin : false 
  }
  let userInfo
  let response
  if(accessToken) {
    const decodeToken:{ id:string, isAdmin:boolean } = await decodeJwt(accessToken);
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
  params.id && (obj.id = params.id)
  params.uuid && (obj.uuid = params.uuid).trim()
  params.nickname && (obj.nickname = params.nickname).trim()
  params.email && (obj.email = params.email).trim()

  if(!obj.id && !obj.uuid && !obj.nickname && !obj.email) {
    obj.email = loggedInfo.email
  }

  //관리자가 아닐경우 본인 계정만 삭제 가능
  if(!loggedInfo.isAdmin) {
    if(userInfo?.email !== loggedInfo.email) {
      return response = 
        {
          success: true,
          data: {
            code: "fail",
            message : '권한이 없습니다.'
          }
        }
    }
  }

  userInfo = await getUser(params)
  console.log('deleteUser ',userInfo)
  if(!userInfo) {
    response = 
      {
        success: true,
        data: {
          code: "fail",
          message : '회원정보가 없습니다.'
        }
      }
    }
  const deleteUser = await prisma.user.delete({
    where: obj,
  })

  if(deleteUser){
    if(loggedInfo.isAdmin === false) {
      cookies().delete('refreshToken');
      cookies().delete('accessToken');
    }
    response = 
      {
        success: true,
        data: {
          code: "success",
          message : '회원 계정정보가 모두 삭제되었습니다.'
        }
      }
  }else{
    response = 
      {
        success: true,
        data: {
          code: "fail",
          message : '회원정보가 없습니다.'
        }
      }
  }
  
  // await getUser({nickname:nickname})
  
  // const nowPasswordValue = request.get('nowPasswordValue') as string;
  // console.log(nowPasswordValue)
  return response
}

export const PasswordChange = async (formData: FormData) => {
  const prisma = new PrismaClient();
  let userInfo
  let response
  const accessToken = cookies().get('accessToken')?.value
  
  if (!accessToken) {
    return {
      success: true,
      data: {
        code: "error",
        message: "아이디 혹은 비밀번호가 맞지 않거나 존재 하지 않은 계정입니다.",
      },
      accessToken:null
    };
  }

  const nowPasswordValue = formData.get('nowPasswordValue') as string;
  const newPasswordValue = formData.get('newPasswordValue') as string;
  const renewPasswordValue = formData.get('renewPasswordValue') as string;

  const decodeToken:{ id:string, isAdmin:boolean } = await decodeJwt(accessToken);
  if(decodeToken && decodeToken.id){
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
      },
    });
  }
  
  if(!userInfo) {
    response = 
      {
        success: true,
        data: {
          code: "error",
          message : '회원정보가 없습니다.'
        }
      }
    }
  if (userInfo! && (await verifyPassword(nowPasswordValue, userInfo!.password))) {
    response = 
      {
        success: true,
        data: {
          code: "success",
          message : '현재 비밀번호와 일치 합니다.'
        }
      }
    if(newPasswordValue && renewPasswordValue && newPasswordValue === renewPasswordValue) {
    
      try {
        await prisma.user.update({
          where: {
            email: decodeToken.id, 
          },
          data: {
            password: await hashedPassword(newPasswordValue),
          }
        })
        response = 
          {
            success: true,
            data: {
              code: "success",
              message : '비밀번호가 변경되었습니다.'
            }
          }
      } catch (error) {
        console.error(error);
      }
    }else{
      if( newPasswordValue !== renewPasswordValue ) {
        response = 
          {
            success: true,
            data: {
              code: "fail",
              message : '변경할 비밀번호가 서로 맞지 않습니다.'
            }
          }
        }
      if( !newPasswordValue || !renewPasswordValue ) {
        response =
          {
            success: true,
            data: {
              code: "fail",
              message : '변경할 비밀번호를 입력해주세요.'
            }
          }
      
    }
  }
    
  } else {
    if(!nowPasswordValue) {
      response = 
        {
          success: true,
          data: {
            code: "fail",
            message : '현재 비밀번호를 입력해주세요.'
          }
        }
    } else {
      response = 
        {
          success: true,
          data: {
            code: "fail",
            message : '현재 비밀번호와 맞지 않습니다.'
          }
        }
    }
    
  }
  return response
  
}