"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Warning from "@plextype/components/message/Warning";

import { motion } from "framer-motion";
import Alert from "@plextype/components/message/Alert";
// import { createUser } from "@/extentions/user/scripts/userController";

const Register = () => {
  const [loading, setLoading] = useState(false); // ✅ 로딩 상태 추가
  const [error, setError] = useState<{ type: string; message: string } | null>(
    null,
  );
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // ✅ 통신 시작 시 true

    const formData = new FormData();
    formData.append("accountId", e.target.accountId.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("nickName", e.target.nickName.value);

    // const response = await fetch("/api/user", {
    //   method: "POST",
    //   body: formData,
    //   credentials: "include", // 쿠키 포함
    // });
    //
    // const res = await response.json();
    // const { type, message, data, accessToken, element } = res;
    //
    // if (res.type === "error") {
    //   setError({ type, message });
    // }
    //
    // if (res.type === "success") {
    //   router.replace("/auth/signin");
    // }

    try {
      // ... (fetch 로직 생략)
      const response = await fetch("/api/user", {
        method: "POST",
        body: formData,
        credentials: "include", // 쿠키 포함
      });
      const res = await response.json();

      if (res.type === "error") {
        setError({ type: res.type, message: res.message });
      }

      if (res.type === "success") {
        router.replace("/auth/signin");
      }
    } catch (err) {
      setError({ type: "error", message: "서버 오류가 발생했습니다." });
    } finally {
      setLoading(false); // ✅ 통신 종료(성공/실패 모두) 시 false
    }
    // await createUser(formData)
    //   .then((response) => {
    //     console.log(response);
    //     if (response?.type === "error") {
    //       console.log(response);
    //       setError(response.message);
    //     } else {
    //       router.replace("/auth/signin");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Failed to register: " + error.toString());
    //   });
  };

  const variants = {
    hidden: { opacity: 0, x: 44 },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
    offscreen: {
      x: 44,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };


  return (
    <motion.div
      className=""
      variants={variants}
      initial="hidden"
      animate="onscreen"
      exit="offscreen"
    >
      <motion.div className="flex justify-center py-10" variants={variants}>
        <div>
          <div className="mb-4 flex justify-center">
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

          <div className="text-2xl text-dark-800 dark:text-dark-50 text-center">
            Register
          </div>
          <div className="text-dark-600 text-sm pt-5 text-center">
            회원가입을 해주셔서 감사드립니다.
          </div>
          <div className="text-dark-600 text-sm text-center">
            회원님의 정보는 안전하게 저장되어 보관됩니다.
          </div>
        </div>
      </motion.div>
      {error && <Alert message={error.message} type={error.type} />}
      <form onSubmit={submitHandler}>
        {/* Account ID Input */}
        <div className="mb-5">
          <label htmlFor="accountId" className="block text-sm text-black dark:text-dark-200 mb-2 font-medium">
            아이디
          </label>
          <div className="">
            <input
              type="text"
              name="accountId"
              id="accountId"
              className=" rounded-lg border border-gray-300 hover:border-gray-900 focus:border-gray-900 w-full bg-transparent py-2.5 px-3 text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-dark-500"
              placeholder="abcd"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="accountId" className="block text-sm text-black dark:text-dark-200 mb-2 font-medium">
            이메일
          </label>
          <div className="">
            <input
              type="email"
              name="email"
              id="email"
              className=" rounded-lg border border-gray-300 hover:border-gray-900 focus:border-gray-900 w-full bg-transparent py-2.5 px-3 text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-dark-500"
              placeholder="example@mail.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label htmlFor="password" className="block text-sm text-black dark:text-dark-200 mb-2 font-medium">
            비밀번호
          </label>
          <div className="">
            <input
              type="password"
              name="password"
              id="password"
              className=" rounded-lg border border-gray-300 hover:border-gray-900 focus:border-gray-900 w-full bg-transparent py-2.5 px-3 text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-dark-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-dark-400 mt-2 ml-1">
            * 비밀번호는 영문, 숫자, 특수문자 1개 이상(@, $, !, %, *, #, ?, &)을 모두 포함해야 합니다.
          </div>
        </div>

        {/* Nickname Input */}
        <div className="mb-6">
          <label htmlFor="nickName" className="block text-sm text-black dark:text-dark-200 mb-2 font-medium">
            닉네임
          </label>
          <div className="">
            <input
              type="text"
              name="nickName"
              id="nickName"
              className=" rounded-lg border border-gray-300 hover:border-gray-900 focus:border-gray-900 w-full bg-transparent py-2.5 px-3 text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-dark-500"
              placeholder="사용하실 닉네임을 입력하세요"
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-dark-400 mt-2 ml-1">
            * 닉네임은 최소2~12자까지 가능하며 특수문자는 사용할 수 없습니다.
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-2">
          <button
            type="submit"
            disabled={loading} // ✅ 로딩 중 버튼 비활성화
            className="flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-gray-800 disabled:bg-gray-400 dark:bg-primary-700 dark:hover:bg-primary-600"
          >
            {loading ? ( // ✅ 로딩 상태에 따라 스피너 표시
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Register Completed"
            )}
          </button>
        </div>
      </form>
      <motion.div className="divider" variants={variants}>
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-dark-600 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="backdrop-blur-sm px-4 text-xs text-dark-400 bg-white dark:bg-dark-950">
              OR
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div className="pb-10" variants={variants}>
        <div className="w-full">
          <div className="flex justify-center">
            <Link href="/auth/signin" className="group text-sm text-dark-500">

              <span className="group-hover:text-gray-500 text-gray-600 dark:group-hover:text-dark-400 dark:text-dark-200 hover:underline">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
