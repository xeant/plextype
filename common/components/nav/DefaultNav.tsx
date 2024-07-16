'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Inspage {
  title: string
  route: string
}

const DefaultNav = ({ list }) => {
  const pathname = usePathname()

  return (
    <>
      {list &&
        list.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.route}
              className={
                'block whitespace-nowrap py-3 px-1 text-sm border-b-4 text-gray-400 hover:text-gray-950 ' +
                (pathname === item.route
                  ? 'border-gray-950 text-gray-950 hover:border-gray-950 hover:text-gray-400 '
                  : 'border-white hover:border-white')
              }
            >
              {item.title}
            </Link>
          )
        })}
      {/* <Link
          href="/user/userUpdate"
          className="whitespace-nowrap py-3 px-1 text-sm border-b-4 text-gray-400 hover:text-gray-950 border-white hover:border-gray-950"
        >
          계정&프로필 설정
        </Link>
        <Link
          href="#"
          className="whitespace-nowrap py-3 px-1 text-sm border-b-4 text-gray-400 hover:text-gray-950 border-white hover:border-gray-950"
        >
          API 설정
        </Link>
        <Link
          href="/user/timeline"
          className="whitespace-nowrap py-3 px-1 text-sm border-b-4 text-gray-400 hover:text-gray-950 border-white hover:border-gray-950"
        >
          타임라인
        </Link>
        <Link
          href="#"
          className="whitespace-nowrap py-3 px-1 text-sm border-b-4 text-gray-400 hover:text-gray-950 border-white hover:border-gray-950"
        >
          1:1문의
        </Link> */}
    </>
  )
}

export default DefaultNav
