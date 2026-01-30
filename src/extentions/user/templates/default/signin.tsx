"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

// import { store } from "@plextype/redux/store";
// import { fetchSignIn } from "@plextype/redux/features/userSlice";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { motion } from "framer-motion";
import Alert from "@plextype/components/message/Alert";

interface SignData {
  type: string;
  element: string;
  message: string;
  userInfo: {
    id: number;
    uuid: string;
    accountId: string;
    nickName: string;
    password: string;
    email_address: string;
    createdAt: string;
    updateAt: string;
  };
}

const Signin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const dispatch = store.dispatch;

  const [user, setUser] = useState<SignData>();
  const [error, setError] = useState<{ type: string; message: string } | null>(
    null,
  );

  const refInputUserId = useRef<HTMLInputElement>(null);
  const refInputPassword = useRef<HTMLInputElement>(null);

  const signIn = async (formData: FormData) => {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: formData,
      credentials: "include", // 쿠키 포함
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      setError({ type: errorData.type, message: errorData.message });
      // throw new Error(errorData.message || "로그인 실패");
    }

    return response.json(); // { result, accessToken }
  };

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (res) => {
      // onSuccess를 async 함수로 변경
      const { type, message, data, accessToken, element } = res;

      if (type === "error") {
        setError({ type, message });
        if (element === "accountId" && refInputUserId.current) {
          refInputUserId.current.focus();
        }
        if (element === "password" && refInputPassword.current) {
          refInputPassword.current.focus();
        }
        return;
      }

      if (data) {
        setUser(res);
      }
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      router.replace("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("accountId", e.target.accountId.value);
    formData.append("password", e.target.password.value);

    mutation.mutate(formData);
  };

  const parentVariants = {
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
    <>
      <motion.div
        initial="hidden"
        animate="onscreen"
        variants={parentVariants}
        exit="offscreen"
      >
        <form onSubmit={submitHandler}>
          <motion.div className="py-10" variants={parentVariants}>
            <div className="dark:text-dark-50 text-2xl font-semibold text-gray-700 text-center">
              Request Access
            </div>
            <div className="dark:text-dark-500 pt-10 text-sm text-gray-600 text-center">
              소셜로그인은 추후에 지원 됩니다. <br></br>일반 회원가입을
              이용하셔도 모든 서비스를 이용 할 수 있습니다.
            </div>
          </motion.div>
          {error && <Alert message={error.message} type={error.type} />}
          <motion.div variants={parentVariants}>
            {/* Account ID Input */}
            <div className="mb-5">
              <label htmlFor="accountId" className="block text-sm text-black dark:text-dark-200 mb-2 font-medium">
                아이디
              </label>
              <div className="">

                <input
                  type="text"
                  id="accountId"
                  name="accountId"
                  ref={refInputUserId}
                  className=" rounded-lg border border-gray-300 hover:border-gray-900 focus:border-gray-900 w-full bg-transparent py-2.5 px-3 text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-dark-500"
                  placeholder="아이디를 입력하세요"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm text-black dark:text-dark-200 mb-2 font-medium">
                비밀번호
              </label>
              <div className="">
                <input
                  type="password"
                  id="password"
                  name="password"
                  ref={refInputPassword}
                  className=" rounded-lg border border-gray-300 hover:border-gray-900 focus:border-gray-900 w-full bg-transparent py-2.5 px-3 text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-dark-500"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mb-4 flex">
              <button
                type="submit"
                disabled={mutation.isPending} // ✅ 로딩 중 버튼 비활성화
                className="flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-gray-800 disabled:bg-gray-400 dark:bg-primary-700 dark:hover:bg-primary-600 dark:disabled:bg-dark-700"
              >
                {mutation.isPending ? ( // ✅ 로딩 상태에 따라 스피너 표시
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    로그인
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </form>

        <motion.div className="pb-10" variants={parentVariants}>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="">
              <Link
                href="/auth/register"
                className="text-dark-500 group text-sm"
              >
                <span className="dark:text-dark-200 dark:hover:text-dark-400 text-gray-500 hover:text-gray-600 group-hover:text-gray-600">
                  회원가입
                </span>
              </Link>
            </div>
            <div className="">
              <Link href="/auth/find" className="text-dark-500 group text-sm">
                <span className="dark:text-dark-200 dark:hover:text-dark-400 text-gray-500 hover:text-gray-600 group-hover:text-gray-600">
                  계정ID / 비밀번호 찾기
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Signin;
