import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { decodeJwt } from 'jose';
import { hashedPassword, verifyPassword } from "@plextype/utils/auth/password";
import { PrismaClient } from "@prisma/client";

import { refresh, sign } from "@plextype/utils/auth/jwtAuth";

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  let userInfo
  let response
  const authorization = headers().get('authorization')
  const accessToken = authorization && authorization.split(' ')[1];
  
  if (!accessToken) {
    return NextResponse.json({ data: 'accessToken Error' }, { status: 201 });
  }
  
  const formData = await request.formData()
  const nickname = formData.get('nickname') as string;
  if (!nickname) {
    return response = NextResponse.json({
      success: true,
      data: {
        code: "error",
        element: 'nickname',
        message : '닉네임 값은 필수입니다.'
      }
    }, { status: 200 });
  }
  const decodeToken: { id:string, isAdmin:boolean } = await decodeJwt(accessToken);
  console.log(decodeToken)
  if(decodeToken && decodeToken.id) {
    try {
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
      if(!userInfo) {
        return response = NextResponse.json(
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
      }else {
        try {
          await prisma.user.update({
            where: {
              email: decodeToken.id, 
            },
            data: {
              nickname: nickname,
            }
          })
          userInfo.nickname = nickname;
          return response = NextResponse.json(
            {
              success: true,
              data: {
                code: "success",
                userInfo : userInfo,
                message : '닉네임이 성공적으로 변경되었습니다.'
              }
            },
            {
              status: 200,
            },
          );
        } catch (error) {
          console.error('userInfo update error' + error);
        }
      }
    } catch (e) {
      console.log('userInfo error' + e)
      throw NextResponse.json({
        success: false,
        data: {
          code: "fail",
          message : '회원정보를 가지고 오는 과정에서 문제가 발생하였습니다.'
        }
      },
      {
        status: 500,
      });
    }
  }else{
    return response = NextResponse.json(
      {
        success: true,
        data: {
          code: "fail",
          message : '토큰 정보가 잘못되었습니다.'
        }
      },
      {
        status: 200,
      },
    );
  }
  // const nowPasswordValue = request.get('nowPasswordValue') as string;
  // console.log(nowPasswordValue)
  // return response
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
