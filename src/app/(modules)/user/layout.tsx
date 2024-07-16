'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DefaultLayout from 'src/layouts/fullLayout/Layout'
import ProfileComponent from '@plextype/components/account/Profile'
import DefaultNav from '@plextype/components/nav/DefaultNav'
import { useSelector } from 'react-redux'
import { RootState } from '@plextype/redux/store'

interface UserInfo {
  code: string
  element: string
  message: string
  userInfo: {
    id: number
    uuid: string
    nickname: string
    password: string
    email: string
    createdAt: string
    updateAt: string
  }
}

const PageLayout = ({ children }) => {
  const route = useRouter()
  const [isLogged, setIsLogged] = useState<boolean | null>()
  const [userNav, setUserNav] = useState<object>([
    {
      title: '대시보드',
      route: '/user',
    },
    {
      title: '계정 프로필 설정',
      route: '/user/userUpdate',
    },
    {
      title: 'API 설정',
      route: '/user/apiSettings',
    },
    {
      title: '타임라인',
      route: '/user/timeline',
    },
    {
      title: '1:1문의',
      route: '/user/1n1contact',
    },
    {
      title: '회원탈퇴',
      route: '/user/userDelete',
    },
  ])
  const [loggedInfo, setLoggedInfo] = useState<UserInfo | undefined>(undefined)

  const userInfo = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    userInfo && userInfo?.userInfo && setLoggedInfo(userInfo.userInfo)
  }, [userInfo])
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const isLoggedIn = accessToken !== null
    setIsLogged(isLoggedIn)
  }, [])

  useEffect(() => {
    if (isLogged === false) {
      alert('로그인 상태가 아닙니다. 메인으로 이동합니다.')
      route.push('/')
    }
  }, [isLogged])

  return (
    <DefaultLayout>
      <ProfileComponent
        profileName={
          loggedInfo && loggedInfo.userInfo && loggedInfo.userInfo.nickname
        }
        profileEmail={
          loggedInfo && loggedInfo.userInfo && loggedInfo.userInfo.email
        }
      />
      <div className="sticky top-[52px] lg:top-[60px] w-full bg-white/90 backdrop-blur-lg z-90 border-b border-gray-100">
        <div className="overflow-scroll-hide overflow-hidden overflow-x-auto flex justify-start md:justify-center gap-8 px-3">
          <DefaultNav list={userNav} />
        </div>
      </div>
      {children}
    </DefaultLayout>
  )
}

export default PageLayout
