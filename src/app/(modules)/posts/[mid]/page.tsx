'use client'

import PostsList from 'src/modules/posts/views/list'

interface PageProps {
  params: {
    mid: string
  }
}

const Page: React.FC<PageProps> = ({ params }: { params: { mid: string } }) => {
  return (
    <>
      <PostsList params={params} />
    </>
  )
}

export default Page
