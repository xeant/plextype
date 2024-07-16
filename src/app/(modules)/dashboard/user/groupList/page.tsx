'use client'

import React, { useState, useEffect } from 'react'

import DefaultNav from '@plextype/components/nav/DefaultNav'

const Page = () => {
  const [userNav, setUserNav] = useState<object>([
    {
      title: '그룹목록',
      route: '/dashboard/user/groupList',
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
  return (
    <>
      <div className="relative">
        <div className=" pt-10">
          <div className="max-w-screen-2xl mx-auto px-3">
            <div className="bg-white">
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="text-black text-2xl font-semibold">
                  회원 설정
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sticky top-0 border-b bg-slate-200 bg-white/80 backdrop-blur-lg">
          <div className="flex pt-3">
            <div className="text-sm py-2 px-5 cursor-pointer border-b border-orange-500 text-black -mb-[1px]">
              회원 목록
            </div>
            <div className="text-sm text-gray-500 py-2 px-5 cursor-pointer hover:border-b hover:border-orange-500 hover:text-slate-600 -mb-[1px]">
              관리자 계정
            </div>
          </div>
        </div>
        <div className="sticky top-[52px] lg:top-[60px] w-full bg-white/90 backdrop-blur-lg z-90 border-b border-gray-100">
          <div className="overflow-scroll-hide overflow-hidden overflow-x-auto flex gap-8 max-w-screen-2xl mx-auto px-3">
            <DefaultNav list={userNav} />
          </div>
        </div>
        <div className="py-10">
          <div className="max-w-screen-2xl mx-auto px-3"></div>
        </div>
      </div>
    </>
  )
}
export default Page
