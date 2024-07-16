'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Warning from '@plextype/components/message/Warning'

import { createPosts } from 'src/modules/posts/dashboard/controllers/posts'

const DashboardPostCreate = () => {
  const router = useRouter()

  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<any>(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    setAccessToken(accessToken)
  }, [])

  const submitHandler = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('moduleId', e.target?.moduleId?.value)
    formData.append('moduleName', e.target?.moduleName.value)
    formData.append('moduleType', e.target?.moduleType.value)
    formData.append('listCount', e.target?.listCount?.value)
    formData.append('pageCount', e.target?.pageCount?.value)
    formData.append('documentLike', e.target?.documentLike.checked)
    formData.append('consultingState', e.target?.consultingState.checked)
    formData.append('commentState', e.target?.commentState.checked)
    formData.append('commentLike', e.target?.commentLike.checked)

    await createPosts(accessToken, formData)
      .then(response => {
        console.log(response)
        if (response?.data.code === 'error') {
          setError(response?.data.message)
        } else {
          router.replace('/dashboard/posts/list')
        }
      })
      .catch(error => {
        console.error('Failed to register: ' + error.toString())
      })
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="hidden" name="moduleType" value="posts" />
        <div className="max-w-screen-2xl mx-auto">
          <div className="px-3">
            <div className="grid grid-cols-4 gap-8 py-10">
              <div className="col-span-1">
                <div className="text-lg font-semibold text-gray-600  mb-3">
                  게시판 기본설정
                </div>
                <div className="text-gray-400 text-sm">
                  게시판의 기본설정을 입력합니다.
                </div>
              </div>
              <div className="col-span-3">
                <div className="grid grid-col-span-2">
                  <div className="col-span-2 grid grid-cols-3 gap-6 hover:bg-gray-50 p-5">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="moduleId">
                        <div className="text-sm text-black mb-3">모듈ID</div>
                      </label>
                      <input
                        type="text"
                        name="moduleId"
                        id="moduleId"
                        className="border border-gray-200 hover:border-gray-950 focus:border-gray-950 w-full py-2 px-3 outline-none rounded-md text-sm shadow-sm shadow-gray-100"
                        placeholder="/?mid=post"
                      />

                      <div className="text-sm text-dark-400 pt-2 font-light">
                        게시판의 모듈ID는 중복될 수 없는 이름입니다.
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-6 hover:bg-gray-50 p-5">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="moduleName">
                        <div className="text-sm text-black mb-3">
                          게시판이름
                        </div>
                      </label>
                      <input
                        type="text"
                        name="moduleName"
                        id="moduleName"
                        className="border border-gray-200 hover:border-gray-950 focus:border-gray-950 w-full py-2 px-3 outline-none rounded-md text-sm shadow-sm shadow-gray-100"
                      />

                      <div className="text-sm text-dark-400 pt-2 font-light">
                        게시판이름을 정하세요. 브라우저 타이틀 혹은 게시판의
                        명칭을 나타냅니다.
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-6 hover:bg-gray-50 p-5">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="listCount">
                        <div className="text-sm text-black mb-3">목록 수</div>
                      </label>
                      <input
                        type="text"
                        name="listCount"
                        id="listCount"
                        className="border border-gray-200 hover:border-gray-950 focus:border-gray-950 w-16 py-2 px-3 outline-none rounded-md text-sm shadow-sm shadow-gray-100"
                        defaultValue={20}
                      />

                      <div className="text-sm text-dark-400 pt-2 font-light">
                        한 페이지에 표시될 글 수를 지정할 수 있습니다. (기본
                        20개)
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-6 hover:bg-gray-50 p-5">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="listCount">
                        <div className="text-sm text-black mb-3">페이지 수</div>
                      </label>
                      <input
                        type="text"
                        name="listCount"
                        id="listCount"
                        className="border border-gray-200 hover:border-gray-950 focus:border-gray-950 w-16 py-2 px-3 outline-none rounded-md text-sm shadow-sm shadow-gray-100"
                        defaultValue={5}
                      />

                      <div className="text-sm text-dark-400 pt-2 font-light">
                        목록 하단, 페이지를 이동하는 링크 수를 지정할 수
                        있습니다. (기본 5개)
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-6 hover:bg-gray-50 p-5">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="documentLike">
                        <div className="text-sm text-black mb-3">
                          좋아요 사용
                        </div>
                      </label>
                      <label className="m-0">
                        <input
                          type="checkbox"
                          name="documentLike"
                          id="documentLike"
                          className="peer hidden"
                        />
                        <div className="block relative rounded-full cursor-pointer bg-gray-200 w-12 h-6 after:content-[''] after:absolute top-[1px] after:rounded-full after:h-6 after:w-6 after:shadow-md after:bg-white after:transition-all peer-checked:bg-cyan-500 after:peer-checked:trangray-x-6"></div>
                      </label>
                      <div className="text-sm text-dark-400 pt-2 font-light">
                        게시글 본문에 좋아요 기능을 사용합니다.
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-6 hover:bg-gray-50 p-5">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="consultingState">
                        <div className="text-sm text-black mb-3">
                          상담 기능 사용
                        </div>
                      </label>
                      <label className="m-0">
                        <input
                          type="checkbox"
                          name="consultingState"
                          id="consultingState"
                          className="peer hidden"
                        />
                        <div className="block relative rounded-full cursor-pointer bg-gray-200 w-12 h-6 after:content-[''] after:absolute top-[1px] after:rounded-full after:h-6 after:w-6 after:shadow-md after:bg-white after:transition-all peer-checked:bg-cyan-500 after:peer-checked:trangray-x-6"></div>
                      </label>
                      <div className="text-sm text-dark-400 pt-2 font-light">
                        관리자와 자신이 쓴 글만 보이도록 하는 기능입니다.
                        &#40;회원 전용&#41;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-px border-b border-gray-200"></div>
          <div className="px-3">
            <div className="grid grid-cols-4 gap-8 py-10">
              <div className="col-span-1">
                <div className="text-lg font-semibold text-gray-600  mb-3">
                  댓글설정
                </div>
                <div className="text-gray-400 text-sm">
                  댓글 관련 설정을 합니다.
                </div>
              </div>
              <div className="col-span-3">
                <div className="grid grid-col-span-2 gap-8">
                  <div className="col-span-2 grid grid-cols-3 gap-6 hover:bg-gray-50 p-5">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="commentState">
                        <div className="text-sm text-black mb-3">댓글 사용</div>
                      </label>
                      <label className="m-0">
                        <input
                          type="checkbox"
                          name="commentState"
                          id="commentState"
                          className="peer hidden"
                        />
                        <div className="block relative rounded-full cursor-pointer bg-gray-200 w-12 h-6 after:content-[''] after:absolute top-[1px] after:rounded-full after:h-6 after:w-6 after:shadow-md after:bg-white after:transition-all peer-checked:bg-cyan-500 after:peer-checked:trangray-x-6"></div>
                      </label>
                      <div className="text-sm text-dark-400 pt-2 font-light">
                        댓글을 사용할지 여부를 결정합니다.
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-6 hover:bg-gray-50 p-5">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="commentLike">
                        <div className="text-sm text-black mb-3">
                          좋아요 사용
                        </div>
                      </label>
                      <label className="m-0">
                        <input
                          type="checkbox"
                          name="commentLike"
                          id="commentLike"
                          className="peer hidden"
                        />
                        <div className="block relative rounded-full cursor-pointer bg-gray-200 w-12 h-6 after:content-[''] after:absolute top-[1px] after:rounded-full after:h-6 after:w-6 after:shadow-md after:bg-white after:transition-all peer-checked:bg-cyan-500 after:peer-checked:trangray-x-6"></div>
                      </label>
                      <div className="text-sm text-dark-400 pt-2 font-light">
                        댓글에 좋아요 기능을 사용합니다.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center bg-slate-100/50 pt-5 pb-10 border-t border-slate-200">
            <div className="px-5 py-2 text-sm text-white bg-dark-500 rounded-md">
              뒤로가기
            </div>
            <button className="px-5 py-2 text-sm text-white bg-orange-500 hover:bg-cyan-600 rounded-md">
              저장하기
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default DashboardPostCreate
