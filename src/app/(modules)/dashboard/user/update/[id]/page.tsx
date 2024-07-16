'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import DefaultNav from '@plextype/components/nav/DefaultNav'
import Warning from '@plextype/components/message/Warning'

import DashboardUserUpdate from 'src/modules/user/dashboard/views/update'

const Page = params => {
  const [error, setError] = useState<any>(false)
  const [userInfo, setUserInfo] = useState<any>()
  const [userNav, setUserNav] = useState<object>([
    {
      title: '회원목록',
      route: '/dashboard/user/list',
    },
    {
      title: '그룹별 회원 목록',
      route: '/dashboard/user/groupUserlist',
    },
    {
      title: '관리자계정',
      route: '/dashboard/user/adminUserlist',
    },
  ])

  console.log(params)
  console.log(params.params.id)

  const userId = parseInt(params.params.id)

  // useEffect(() => {
  //   userId &&
  //     getUserInfo(userId)
  //       .then(data => {
  //         console.log(data)
  //         setUserInfo(data)
  //       })
  //       .catch(error => {
  //         console.error('Failed to get user info: ' + error.toString())
  //       })
  // }, [])

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])

  return (
    <>
      <div className="relative">
        <div className="pt-10">
          <div className="max-w-screen-2xl mx-auto px-3">
            <div className="">
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="text-black text-2xl font-semibold">
                  회원 설정
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-[52px] lg:top-[60px] w-full bg-white/90 backdrop-blur-lg z-90 border-b border-gray-100">
          <div className="overflow-scroll-hide overflow-hidden overflow-x-auto flex gap-8 max-w-screen-2xl mx-auto px-3">
            <DefaultNav list={userNav} />
          </div>
        </div>
        {userId && <DashboardUserUpdate userid={userId} />}
      </div>
    </>
  )
}

export default Page
