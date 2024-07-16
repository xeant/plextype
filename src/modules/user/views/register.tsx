'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Warning from '@plextype/components/message/Warning'
import TextInput from '@plextype/components/form/TextInput'

import { createUser } from 'src/modules/user/controllers/user'

const Register = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [nickName, setNickName] = useState<string>()

  const [error, setError] = useState<any>(false)
  const router = useRouter()

  const getEmail = (msg: string) => {
    setEmail(msg)
  }
  const getPassword = (msg: string) => {
    setPassword(msg)
  }
  const getNickname = (msg: string) => {
    setNickName(msg)
  }

  const submitHandler = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('email', e.target.email.value)
    formData.append('password', e.target.password.value)
    formData.append('nickname', e.target.nickname.value)

    await createUser(formData)
      .then(response => {
        console.log(response)
        if (response?.data.code === 'fail') {
          console.log(response)
          setError(response.data.message)
        } else {
          router.replace('/auth/Signin')
        }
      })
      .catch(error => {
        console.error('Failed to register: ' + error.toString())
      })

    // const postData = async () => {
    //   const response = await fetch('/auth/api/register', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   return response.json()
    // }
    // postData()
    //   .then(data => {
    //     if (data.code === 'error') {
    //       console.log(data)
    //       setError(data.msg)
    //     } else {
    //       router.replace('/dashboard/user/list')
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Failed to register: ' + error.toString())
    //   })
  }

  // const registerUser = async e => {
  //   e.preventDefault()
  //   const userData = await axios
  //     .post('/api/auth/register', {
  //       method: 'POST',
  //       body: {
  //         nickname: nickName.trim(),
  //         email: email.trim(),
  //         password: password.trim(),
  //       },
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then(res => {
  //       router.replace('/auth/Signin')
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       console.log('Error >> ' + error.code, error.response.data.message)
  //       setError(error.response.data.message)
  //       return error.response
  //     })
  //   // signIn("credentials", {
  //   //   email, password, callbackUrl: `${window.location.origin}/Account`, redirect: false }
  //   // ).then(function(result) {
  //   //   router.push(result.url)
  //   // }).catch(err => {
  //   //   alert("Failed to register: " + err.toString())
  //   // });
  // }

  return (
    <div className="">
      <div className="py-10">
        <div className="flex mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-10 h-10 text-black dark:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
            />
          </svg>
        </div>

        <div className="text-2xl text-dark-800 dark:text-dark-50">Register</div>
        <div className="text-dark-600 text-sm pt-5">
          회원가입을 해주셔서 감사드립니다.
        </div>
        <div className="text-dark-600 text-sm">
          회원님의 정보는 안전하게 저장되어 보관됩니다.
        </div>
      </div>
      {error && <Warning message={error} />}
      <form onSubmit={submitHandler}>
        <div className="relative mb-5 w-full">
          <div className="flex items-center w-full text-xs">
            <div className="group flex items-center w-full border-[0.5px] border-gray-300 dark:border-dark-600/75 dark:hover:border-dark-300 dark:focus:border-dark-300 rounded-full dark:bg-dark-950/20 transition-all duration-300 backdrop-blur-sm bg-gray-50/50">
              <div className="px-5">
                <span className="text-dark-300">이메일</span>
              </div>
              <input
                type="text"
                name="email"
                id=""
                className="outline-none bg-transparent text-sm py-3 pr-3 text-black flex-1 placeholder:text-dark-500/75"
                placeholder="example@mail.com"
              />
            </div>
          </div>
        </div>

        <div className="relative mb-5 w-full">
          <div className="flex items-center w-full text-xs">
            <div className="group flex items-center w-full border-[0.5px] border-gray-300 dark:border-dark-600/75 dark:hover:border-dark-300 dark:focus:border-dark-300 rounded-full dark:bg-dark-950/20 transition-all duration-300 backdrop-blur-sm bg-gray-50/50">
              <div className="px-5">
                <span className="text-dark-300">비밀번호</span>
              </div>
              <input
                type="password"
                name="password"
                id=""
                className="outline-none bg-transparent text-sm py-3 pr-3 text-black flex-1 placeholder:text-dark-500/75"
                placeholder="User Password"
              />
            </div>
          </div>
          <div className="text-dark-400 text-xs pt-2 px-2">
            비밀번호는 암호화 되어 안전하게 저장됩니다.
          </div>
        </div>
        <div className="relative mb-5 w-full">
          <div className="flex items-center w-full text-xs">
            <div className="group flex items-center w-full border-[0.5px] border-gray-300 dark:border-dark-600/75 dark:hover:border-dark-300 dark:focus:border-dark-300 rounded-full dark:bg-dark-950/20 transition-all duration-300 backdrop-blur-sm bg-gray-50/50">
              <div className="px-5">
                <span className="text-dark-300">닉네임</span>
              </div>
              <input
                type="text"
                name="nickname"
                id=""
                className="outline-none bg-transparent text-sm py-3 pr-3 text-black flex-1 placeholder:text-dark-500/75"
                placeholder="User nick name"
              />
            </div>
          </div>
        </div>

        <div className="mb-2">
          <button className="flex justify-center items-center w-full bg-slate-900 dark:bg-primary-700 dark:hover:bg-primary-600 hover:text-white dark:hover:text-white dark:text-white text-white py-3 px-5 rounded-lg transition duration-300 hover:bg-slate-700 text-sm">
            Register Completed
          </button>
        </div>
      </form>
      <div className="divider">
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-dark-600 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="backdrop-blur-sm px-4 text-xs text-dark-400">
              OR
            </span>
          </div>
        </div>
      </div>
      <div className="pb-10">
        <div className="w-full">
          <div className="w-full">
            <Link href="/auth/Signin" className="group text-sm text-dark-500">
              계정이 이미 있으시다면{' '}
              <span className="group-hover:text-gray-500 text-gray-600 dark:group-hover:text-dark-400 dark:text-dark-200 underline">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
