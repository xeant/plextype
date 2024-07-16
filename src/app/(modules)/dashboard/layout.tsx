'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import 'styles/globals.css'
import 'styles/tailwindcss.css'

import nav from '@plextype/res/config/settings.json'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="selection:text-white selection:bg-orange-500 bg-white min-h-screen">
      <div className="h-full">
        <div className="fixed w-full top-0 bg-gray-950/90 backdrop-blur-lg h-[60px] z-101">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <div className="flex items-center p-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </div>
              <div className="flex items-center p-3 text-white mr-3">
                홈 페이지
              </div>
            </Link>
            <div className="flex-1"></div>
            <div className="flex items-center px-3">
              <div className="max-w-xl flex items-center rounded-full bg-gray-700/75 backdrop-blur-lg px-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  type="text"
                  className="bg-transparent text-white py-2 outline-none px-3 text-sm w-full"
                />
              </div>
            </div>
            <div className="flex gap-4 px-3">
              <div className="flex items-center text-gray-300 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center py-3 bg-gray-600/25 backdrop-blur-lg px-5">
              <div className="rounded-full w-8 h-8 bg-gray-500"></div>
              <div className="px-2">
                <div className="text-white text-sm">Jhon Kury</div>
                <div className="text-xs text-gray-300">CEO Business</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-[60px]"></div>
        <div className="fixed w-[300px] bg-white backdrop-blur-lg h-screen overflow-hidden overflow-y-auto border-r border-slate-200">
          <div className="py-6 px-5">
            <div className=" mb-10">
              <div className="flex items-center mb-1">
                <Link
                  href="/dashboard"
                  className="flex flex-1 text-black text-xl font-semibold"
                >
                  Dashboard
                </Link>
                <div className="px-3">
                  <div className="rounded-full w-2 h-2 bg-lime-400"></div>
                </div>
                <div className="text-black cursor-pointer border border-slate-200 rounded-md py-1 px-2 hover:bg-slate-200/25 dark:hover:bg-gray-800/25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-gray-500 text-xs">Dashboard 홈으로 가기</div>
            </div>
            <div className="mb-10">
              {nav.navigation &&
                Object.entries(nav.navigation).map((item, index) => {
                  return (
                    <div key={index} className="mb-5">
                      <>
                        <div className="text-sm uppercase font-medium text-gray-400 ">
                          {item[1].title}
                        </div>
                        <div className="py-6">
                          {Object.entries(item[1].subMenu).map(
                            (item2, index2) => {
                              return (
                                <div key={index2} className="mb-1">
                                  <Link
                                    href={item2[1].route}
                                    className={
                                      'flex gap-4 text-sm hover:text-white hover:bg-cyan-500 dark:hover:text-white py-2.5 px-4 rounded ' +
                                      (item2[1].route === pathname
                                        ? ' bg-cyan-500 text-white '
                                        : '')
                                    }
                                  >
                                    <div></div>
                                    <div className="px-3">{item2[1].title}</div>
                                  </Link>
                                </div>
                              )
                            }
                          )}
                        </div>
                      </>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div className="relative top-0 ml-[300px] bg-white pt-[60px]">
          {children}
        </div>
      </div>
    </div>
  )
}
