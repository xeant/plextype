'use client'

import React, { useState, useEffect, useRef } from 'react'
import Warning from '@plextype/components/message/Warning'

import { PasswordChange } from 'src/modules/user/controllers/user'

const ChangePassword = props => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<any>(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    setAccessToken(accessToken)

    console.log(props.close)
  }, [])

  useEffect(() => {
    !accessToken
      ? setError('로그인 상태가 아닙니다. (token access error)')
      : setError(null)
  }, [accessToken])

  // const userData = async data => {
  //   console.log(data)
  //   const response = await fetch('/user/api/changePassword', {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     method: 'POST',
  //     body: data,
  //   })
  //   return response.json()
  // }

  const submitHandler = async e => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('nowPasswordValue', e.target.now_password.value)
    formData.append('newPasswordValue', e.target.new_password.value)
    formData.append('renewPasswordValue', e.target.renew_password.value)
    if (accessToken) {
      await PasswordChange(formData).then(response => {
        console.log(response)
        if (response.data.code === 'fail') {
          setError(response.data.message)
        } else {
          setError(response.data.message)
          if (response.data.code === 'success') {
            setTimeout(() => {
              console.log('이게 어째서?')
              props.close(false)
            }, 1000)
          }
        }
      })
    }
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="px-5">
          {error && <Warning message={error} />}
          <div className="grid grid-cols-3 gap-4 py-3 mb-2 border-b border-gray-100">
            <div className="col-span-1 text-sm text-gray-400 p-2">
              이전 비밀번호
            </div>
            <div className="col-span-2">
              <input
                type="password"
                name="now_password"
                className="w-full py-2 border border-gray-200 hover:border-gray-900 focus:border-gray-900 px-5 rounded-lg outline-none"
                placeholder="비밀번호 변경"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 py-3 mb-2 border-b border-gray-100">
            <div className="col-span-1 text-sm text-gray-400 p-2">
              신규 비밀번호
            </div>
            <div className="col-span-2">
              <input
                type="password"
                name="new_password"
                className="w-full py-2 border border-gray-200 hover:border-gray-900 focus:border-gray-900 px-5 rounded-lg outline-none"
                placeholder="비밀번호 변경"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 py-3 mb-2">
            <div className="col-span-1 text-sm text-gray-400 p-2">
              신규 비밀번호 확인
            </div>
            <div className="col-span-2">
              <input
                type="password"
                name="renew_password"
                className="w-full py-2 border border-gray-200 hover:border-gray-900 focus:border-gray-900 px-5 rounded-lg outline-none"
                placeholder="비밀번호 변경"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 gap-[1px] bg-gray-200">
          <button className="flex-1 bg-white text-sm py-4 px-5 hover:bg-gray-100 hover:text-gray-900 text-gray-500">
            비우기
          </button>
          <button
            type="submit"
            className="flex-1 bg-white text-sm border-gray-200 py-4 px-5 hover:bg-blue-500 hover:text-white text-blue-500"
          >
            변경하기
          </button>
        </div>
      </form>
    </>
  )
}

export default ChangePassword
