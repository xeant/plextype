'use client'

import Link from 'next/link'

const Page = () => {
  return (
    <>
      <div className="max-w-screen-md mx-auto px-3">
        <div className="py-20">
          <div className="dark:bg-dark-900 dark:shadow-dark-950 dark:border-dark-700/90 dark:border-t-dark-600/60 relative w-full overflow-hidden rounded-xl border border-gray-200/75 bg-gray-100 p-5 shadow-lg shadow-gray-100/90 backdrop-blur-xl lg:p-10 h-full">
            <div className="flex gap-4 flex-wrap">
              <div className="pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-medium mb-5">
                  접근 권한이 없습니다.
                </div>
                <div className="text-base text-gray-500">
                  접근 권한이 없는 페이지입니다. 관리자에게 문의하세요.
                </div>
                <div>
                  <div className="text-sm text-gray-400 mt-2">
                    <span>참고: </span>
                    <span>
                      <Link
                        href="https://plextype.com"
                        className="text-blue-500 hover:underline"
                      >
                        자주묻는 질문
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="mt-10 px-5 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-md"
                onClick={() => {
                  window.history.back()
                }}
              >
                뒤로가기
              </button>
              <button
                className="mt-10 ml-2 px-5 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-md"
                onClick={() => {
                  window.location.href = '/'
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
