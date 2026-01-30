"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Alert from "@plextype/components/message/Alert";

const FindAccountID = () => {
  const [phase, setPhase] = useState<"input" | "result">("input");
  const [foundId, setFoundId] = useState<string>("");
  const [error, setError] = useState<{ type: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const target = e.currentTarget;
    const nickName = (target.elements.namedItem("nickName") as HTMLInputElement).value;
    const email = (target.elements.namedItem("email") as HTMLInputElement).value;

    // TODO: API 연동 로직 (가상 예시)
    try {
      // const res = await fetch("/api/auth/find-id", { ... });
      // 결과가 있다고 가정
      setTimeout(() => {
        if (nickName === "테스트") { // 예시용 실패 로직
          setFoundId("user****@example.com");
          setPhase("result");
        } else {
          setError({ type: "error", message: "일치하는 정보가 없습니다." });
        }
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError({ type: "error", message: "서버 오류가 발생했습니다." });
      setLoading(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };


  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {phase === "input" ? (
          <motion.div key="input" variants={variants} initial="hidden" animate="visible" exit="exit">
            <div className="text-center py-10">
              <div className="mb-4 flex justify-center text-gray-700 dark:text-dark-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-dark-50">아이디 찾기</h2>
              <p className="text-gray-500 dark:text-dark-400 text-sm mt-3">가입 시 등록한 이름과 이메일을 입력해주세요.</p>
            </div>

            {error && <Alert message={error.message} type={error.type} />}

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="block text-sm text-black dark:text-dark-200 mb-2 font-medium">닉네임 (이름)</label>
                <div className="">
                  <input type="text" name="nickName" required className=" rounded-lg border border-gray-300 hover:border-gray-900 focus:border-gray-900 w-full bg-transparent py-2.5 px-3 text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-dark-500" placeholder="닉네임을 입력하세요" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-black dark:text-dark-200 mb-2 font-medium">등록된 이메일</label>
                <div className="">
                  <input type="email" name="email" required className=" rounded-lg border border-gray-300 hover:border-gray-900 focus:border-gray-900 w-full bg-transparent py-2.5 px-3 text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-dark-500" placeholder="example@mail.com" />
                </div>
              </div>

              <button disabled={loading} className="w-full bg-gray-900 dark:bg-primary-700 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex justify-center items-center">
                {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "아이디 찾기"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="result" variants={variants} initial="hidden" animate="visible" exit="exit" className="text-center py-10">
            <div className="mb-6 flex justify-center text-cyan-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-dark-50">아이디를 찾았습니다!</h2>
            <div className="mt-8 p-6 bg-gray-50 dark:bg-dark-900 rounded-lg border border-gray-100 dark:border-dark-800">
              <p className="text-sm text-gray-500 dark:text-dark-400">회원님의 아이디는 다음과 같습니다.</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-2 select-all">{foundId}</p>
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/auth/signin" className="block w-full bg-gray-900 dark:bg-primary-700 text-white py-3 rounded-lg font-medium hover:bg-gray-800">
                로그인하러 가기
              </Link>
              <button onClick={() => setPhase("input")} className="block w-full text-gray-500 hover:text-gray-800 text-sm underline">
                다시 찾기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="my-12 pt-6 border-t border-gray-100 dark:border-dark-800">
        <Link href="/auth/signin" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          로그인 화면으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default FindAccountID;