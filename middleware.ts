import { NextRequest, NextResponse } from 'next/server'
import { decodeJwt } from 'jose';
// import { decode } from "src/utils/auth/jwtAuth";

// 미들웨어 생성
export async function middleware(request: NextRequest, response: NextResponse) {
  try {
    const { cookies } = request;
    const hasAccessToken = cookies.has('accessToken');
    const accessToken = request.cookies.get('accessToken')
    let decodeToken : { id:string, isAdmin:boolean }
    if(accessToken?.value){
      decodeToken = await decodeJwt(accessToken.value);
      if (!decodeToken?.isAdmin && request.nextUrl.pathname.startsWith('/dashboard')) {
        console.log('dashboard not found')
        return NextResponse.redirect(
          new URL('/access', request.url),
        );
      }
      // if (
      //   request.nextUrl.pathname.startsWith('/auth/Signin') || 
      //   request.nextUrl.pathname.startsWith('/auth/Register')
      // ) {
      //   // 요청 url이 Login이거나 createAccount일 경우 && 토큰값이 있다면 
      //   // 로그인된 상태로 인지, Home 으로 redirect
      //   if (accessToken?.value) return NextResponse.redirect('/access') 
      // }

    }
    if (!hasAccessToken && request.nextUrl.pathname.startsWith('/user')) {
      return NextResponse.redirect(
        new URL('/auth/Signin', request.url),
      );
      
    }
    if (!hasAccessToken && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(
        new URL('/auth/Signin', request.url),
      );
      
    }
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.error();
  }
  // return NextResponse.next();
}