'use client'

import PostWrite from 'src/modules/posts/views/write'

const Page = () => {
  return (
    <>
      <div className="max-w-screen-lg mx-auto px-3">
        <div className="py-5 px-8 rounded-2xl">
          <div className="pt-8 mb-6">
            <PostWrite />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
