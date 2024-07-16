'use client'

import Image from 'next/image'
import Bottom from '@plextype/components/panel/Bottom'
import PostsRead from 'src/modules/posts/views/read'
const Page = () => {
  return (
    <>
      <Bottom>
        <PostsRead />
      </Bottom>
    </>
  )
}

export default Page
