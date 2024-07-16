'use client'

import React, { useState, useEffect } from 'react'
import DefaultNav from '@plextype/components/nav/DefaultNav'
import DashboardPostCreate from 'src/modules/posts/dashboard/views/create'

const Page = () => {
  const [userNav, setUserNav] = useState<object>([
    {
      title: '게시판 목록',
      route: '/dashboard/user/list',
    },
    {
      title: '게시판 생성',
      route: '/dashboard/posts/create',
    },
  ])

  return (
    <>
      <div className="relative">
        <div className="pt-10">
          <div className="max-w-screen-2xl mx-auto px-3">
            <div className="">
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="text-black text-2xl font-semibold">
                  게시판 설정
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
        <DashboardPostCreate />
      </div>
    </>
  )
}

export default Page
