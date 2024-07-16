'use client'

import React, { useState, useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '@plextype/redux/store'
import { store } from '@plextype/redux/store'
import { fetchUserInfo } from '@plextype/redux/features/userSlice'

import Popup from '@plextype/components/modal/Popup'
import Warning from '@plextype/components/message/Warning'
import ChangePassword from './changePassword'

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
const UpdateUser = (props: any) => {
  const dispatch = store.dispatch
  const [showPopup, setShowPopup] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loggedInfo, setLoggedInfo] = useState<UserInfo>()
  const [error, setError] = useState<any>(false)

  const userInfo = useSelector((state: RootState) => state.userInfo)

  const closePopup = close => {
    setShowPopup(close)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    setAccessToken(accessToken)

    userInfo && userInfo.userInfo && setLoggedInfo(userInfo.userInfo)
  }, [])

  // interface SignData {
  //   code: string
  //   element: string
  //   message: string
  //   userInfo: {
  //     id: number
  //     uuid: string
  //     nickname: string
  //     password: string
  //     email: string
  //     createdAt: string
  //     updateAt: string
  //   }
  // }

  const handleUserInfoSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nickname', e.target.nickname.value)
    accessToken &&
      dispatch(fetchUserInfo({ accessToken, formData })).then(
        (resultAction: ReturnType<typeof dispatch>) => {
          const dataInfo = resultAction.payload as UserInfo
          dataInfo?.code === 'error' && setError(dataInfo?.message)
        }
      )
  }
  return (
    <>
      <form onSubmit={handleUserInfoSubmit}>
        <div>
          {error && <Warning message={error} />}
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4 py-3 mb-2 border-b border-gray-100">
              <div className="col-span-1 text-base text-gray-400 p-2">
                이메일
              </div>
              <div className="col-span-2 text-base text-gray-900 p-2">
                {loggedInfo && loggedInfo.userInfo && loggedInfo.userInfo.email}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3 mb-2 border-b border-gray-100">
              <div className="col-span-1 text-base text-gray-400 p-2">
                프로필 이미지
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-8">
                  <div className="relative text-gray-300 rounded-full w-20 h-20 bg-gray-200 hover:bg-gray-300"></div>
                  <div className="flex gap-2">
                    <button className="text-xs border-green-500 border py-1 px-3 rounded-lg hover:bg-green-500 hover:text-white text-green-500">
                      변경하기
                    </button>
                    <button className="text-xs border-rose-500 border py-1 px-3 rounded-lg hover:bg-rose-500 hover:text-white text-rose-500">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3 mb-2 border-b border-gray-100">
              <div className="col-span-1 text-base text-gray-400 p-2">
                비밀번호
              </div>
              <div className="col-span-2 flex items-center">
                <a
                  className="text-xs border-purple-500 border py-2 px-3 rounded-lg hover:bg-purple-500 hover:text-white text-purple-500 cursor-pointer"
                  onClick={() => setShowPopup(true)}
                >
                  비밀번호 변경
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 py-3 mb-2">
              <div className="col-span-1 text-base text-gray-400 p-2">
                닉네임
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  name="nickname"
                  className="w-full py-2 border border-gray-200 hover:border-gray-900 focus:border-gray-900 px-5 rounded-lg outline-none"
                  placeholder="변경할 닉네임을 입력해주세요."
                  defaultValue={
                    loggedInfo &&
                    loggedInfo.userInfo &&
                    loggedInfo.userInfo.nickname
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4 pb-10 px-3">
            <button className="text-sm border-rose-500 border py-2 px-5 rounded-lg hover:bg-rose-500 hover:text-white text-rose-500">
              뒤로가기
            </button>
            <button className="text-sm border-blue-500 border py-2 px-5 rounded-lg hover:bg-blue-500 hover:text-white text-blue-500">
              저장하기
            </button>
          </div>
        </div>
      </form>
      <Popup state={showPopup} title="비밀번호 변경" close={closePopup}>
        <ChangePassword close={closePopup} />
      </Popup>
    </>
  )
}

export default UpdateUser
