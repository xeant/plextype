'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@plextype/redux/store'
import { useRouter } from 'next/navigation'
import Dropdown from '@plextype/components/dropdown/Dropdown'
import Avator from '@plextype/components/avator/Avator'
import DefaultList from '@plextype/components/nav/DefaultList'
import { store } from '@plextype/redux/store'
import { resetUserInfo } from '@plextype/redux/features/userSlice'

import { Signout, Refresh } from 'src/modules/user/controllers/auth'

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
interface Item {
  title: string
  name: string
  route: string
  condition?: {
    operation: string
    name: string
    variable: string | boolean
  }
}

const AccountDropwdown = () => {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [loggedInfo, setLoggedInfo] = useState<UserInfo | undefined>(undefined)

  const userInfo = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    const dispatch = store.dispatch
    const accessToken = localStorage.getItem('accessToken')
    const isLoggedIn = accessToken !== null
    setIsLogged(isLoggedIn)

    if (isLoggedIn && accessToken) {
      accessToken && fetchUserData(accessToken)
    } else {
      localStorage.getItem('persist:root') &&
        localStorage.removeItem('persist:root')
      dispatch(resetUserInfo())
    }
  }, [])

  useEffect(() => {
    userInfo && userInfo?.userInfo && setLoggedInfo(userInfo.userInfo)
  }, [userInfo])

  const closeDropdown = close => {
    setShowDropdown(close)
  }

  const [guestNav, setGuestNav] = useState<Array<Item>>([
    {
      title: '로그인',
      name: 'Signin',
      route: '/auth/Signin',
    },
    {
      title: '회원가입',
      name: 'Register',
      route: '/auth/Register',
    },
  ])
  const [userNav, setUserNav] = useState<Array<Item>>([
    {
      title: '마이페이지',
      name: 'user',
      route: '/user',
    },
    {
      title: '로그아웃',
      name: 'Signout',
      route: '/',
    },
    {
      title: '관리자',
      name: 'dashboard',
      route: '/dashboard',
      condition: {
        operation: 'equals',
        name: 'isAdmin',
        variable: true,
      },
    },
  ])

  const handleSignOut = async () => {
    console.log('logout')
    const accessToken = localStorage.getItem('accessToken')
    await Signout(accessToken).then(data => {
      if (data) {
        localStorage.removeItem('persist:root')
        localStorage.removeItem('accessToken')
        window.location.href = '/'
      }
    })
  }

  const fetchUserData = async (accessToken: string) => {
    try {
      // const response = await fetch('/auth/api/signin', {
      //   method: 'PUT',
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // })

      await Refresh(accessToken).then(response => {
        console.log(response)
        if (response.data.code === 'new_accessToken' && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken)
        }
        if (
          response.data.code === 'refreshToken_expires' &&
          response.accessToken === null
        ) {
          localStorage.removeItem('persist:root')
          localStorage.removeItem('accessToken')
          alert(response.data.message)
          window.location.href = '/'
        }
      })

      //   if (response.ok) {
      //     if (response.status === 200) {
      //       const userData = await response.json()
      //       if (userData.accessToken) {
      //         localStorage.setItem('accessToken', userData.accessToken)
      //       }
      //       if (userData.success === false) {
      //         localStorage.removeItem('persist:root')
      //         localStorage.removeItem('accessToken')
      //         alert(userData.message)
      //         window.location.href = '/'
      //       }
      //     }
      //     if (response.status === 401) {
      //     }
      //   } else {
      //     throw new Error('Failed to fetch error: ' + response.status)
      //   }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const callbackName = name => {
    name === 'Signout' && handleSignOut()
  }
  return (
    <>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <Avator username={loggedInfo?.userInfo?.nickname} />
      </button>
      <Dropdown state={showDropdown} close={closeDropdown}>
        {isLogged ? (
          <DefaultList
            list={userNav}
            loggedInfo={loggedInfo?.userInfo}
            callback={callbackName}
          />
        ) : (
          <DefaultList list={guestNav} callback={callbackName} />
        )}
      </Dropdown>
      {/*     
      {isLogged ? (
        <>
          <motion.div className="w-56" variants={innerAnimation}>
            <Link
              href="/user"
              className="dark:hover:bg-dark-600/50 block rounded bg-transparent px-4 py-2 text-xs text-gray-800 hover:bg-gray-950 hover:text-white dark:text-white dark:hover:text-white"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                  <div className="pl-2">마이 페이지</div>
                </div>
              </div>
            </Link>
          </motion.div>
          <motion.div variants={innerAnimation}>
            <button
              onClick={handleSignOut}
              className="dark:hover:bg-dark-600/50 block w-full rounded bg-transparent px-4 py-2 text-xs text-gray-800 hover:bg-gray-950 hover:text-white dark:text-white dark:hover:text-white"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>

                  <div className="pl-2">Sign Out</div>
                </div>
              </div>
            </button>
          </motion.div>

          <div className="dark:border-dark-700 mx-3 my-2 block border-b border-gray-200/75"></div>
        </>
      ) : (
        <>
          <motion.div className="w-56" variants={innerAnimation}>
            <Link
              href="/auth/Signin"
              className="dark:hover:bg-dark-600/50 block rounded bg-transparent px-4 py-2 text-xs text-gray-800 hover:bg-gray-950 hover:text-white dark:text-white dark:hover:text-white"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                  <div className="pl-2">Sign In</div>
                </div>
              </div>
            </Link>
          </motion.div>
          <motion.div variants={innerAnimation}>
            <Link
              href="/auth/Register"
              className="dark:hover:bg-dark-600/50 block rounded bg-transparent px-4 py-2 text-xs text-gray-800 hover:bg-gray-950 hover:text-white dark:text-white dark:hover:text-white"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>

                  <div className="pl-2">Register</div>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="dark:border-dark-700 mx-3 my-2 block border-b border-gray-200/75"></div>
        </>
      )} */}
    </>
  )
}

export default AccountDropwdown
