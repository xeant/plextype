'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Editorjs = dynamic(() => import('@plextype/components/editor/Editorjs'), {
  ssr: false,
})

const PostWrite = ({}) => {
  const [data, setData] = useState<object | null>(null)
  const [category, setCategory] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  useEffect(() => {
    console.log(data)
  }, [data])

  const handlerCategory = event => {
    setCategory(event.target.value)
  }
  const handlerTitle = event => {
    setTitle(event.target.value)
  }
  return (
    <>
      <div>
        <div className="flex gap-4 pb-6">
          <select
            onChange={handlerCategory}
            className="border-b border-gray-200 focus:border-gray-950 py-2 px-5 outline-none"
          >
            <option>Selected.</option>
          </select>
        </div>
        <div className="py-6">
          <input
            type="text"
            name=""
            onChange={handlerTitle}
            className="text-gray-900 text-3xl w-full outline-none font-medium"
            placeholder="제목을 입력해주세요."
          />
        </div>
        <div className="py-6">
          <Editorjs onChange={setData} holder="editorjs-container" />
        </div>
        <div className="flex justify-center">
          <div className="bg-white text-gray-500 hover:text-gray-950 focus:text-gray-950 border border-gray-300 hover:border-gray-900 focus:border-gray-900 text-sm py-4 px-16 rounded-md">
            저장하기
          </div>
        </div>
      </div>
    </>
  )
}

export default PostWrite
