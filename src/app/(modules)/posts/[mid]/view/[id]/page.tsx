'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import PostsRead from 'src/modules/posts/views/read'
//
// interface PageProps {
//   params: {
//     postId: string
//   }
// }
const Page = () => {
  // const [documentInfo, setDocumentInfo] = useState<{[key: string]: any}>()

  // let items
  // const fetchData = async () => {
  //   items = await getData()
  //   setDocumentInfo(items)
  // }
  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <>
      <PostsRead />
    </>
  )
}
export default Page
