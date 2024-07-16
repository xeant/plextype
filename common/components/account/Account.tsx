'use client'

import { useState, useEffect } from 'react'
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

const Account = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [loggedInfo, setLoggedInfo] = useState<UserInfo | undefined>(undefined)
  const userInfo = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    userInfo && userInfo?.userInfo && setLoggedInfo(userInfo.userInfo)
  }, [userInfo])

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await fetch('/auth/Signin/api', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.ok) {
        if (response.status === 200) {
          const userData = await response.json()
          if (userData.accessToken) {
            localStorage.setItem('accessToken', userData.accessToken)
          }
          if (userData.success === false) {
            localStorage.removeItem('accessToken')
            alert(userData.message)
          }
        }
        if (response.status === 401) {
        }
      } else {
        throw new Error('Failed to fetch error: ' + response.status)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const isLoggedIn = accessToken !== null
    setIsLogged(isLoggedIn)
    if (isLoggedIn && accessToken) {
      accessToken && fetchUserData(accessToken)
    }
  }, [])
  return (
    <>
      <div className="">
        {isLogged ? (
          <div className="flex gap-2 md:pr-4">
            <div className="flex items-center">
              <div className="relative dark:bg-dark-400 block h-5 w-5 rounded-full bg-gray-800">
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center flex-1 gap-2">
              <div>
                <div className="text-left dark:text-dark-100 text-xs font-medium text-gray-800">
                  {loggedInfo &&
                    loggedInfo.userInfo &&
                    loggedInfo.userInfo.nickname}
                </div>
              </div>
              {/* <div className="border border-orange-500 text-orange-500 rounded-md py-1 px-3 text-[10px]">
                PREMIUM
              </div> */}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2 py-2 rounded-full bg-gray-950 shadow-lg shadow-gray-400/80 hover:border-gray-950 hover:bg-gray-700 hover:text-white">
            <div className="text-white px-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div className="hidden items-center pr-3 text-xs text-white md:flex">
              Account
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Account
