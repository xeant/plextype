'use client'

const Page = () => {
  return (
    <div className="flex items-center justify-center text-white h-full w-full">
      <div className="border border-rose-900 rounded-lg mx-auto max-w-screen-md w-full p-10 bg-rose-500/25 backdrop-blur-lg">
        <div className="flex justify-center mb-5 text-rose-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="text-center font-semibold text-xl">
          Access denied for user
        </div>
        <div className="text-dark-400 text-center pt-5">
          접근 권한이 없습니다. 관리자에게 문의하시기 바랍니다.
        </div>
      </div>
    </div>
  )
}

export default Page
