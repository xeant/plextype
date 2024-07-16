import React, { memo, useEffect, useRef } from 'react'
import EditorConstants from './EditorConstants'
import EditorJS, { OutputData } from '@editorjs/editorjs'

type Props = {
  data?: OutputData
  onChange(val: OutputData): void
  holder: string
}

const Editor = ({ data, onChange, holder }: Props) => {
  const ref = useRef<EditorJS>()

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EditorConstants,
        // autofocus: true,
        minHeight: 100,
        // config: {
        //   minHeight: 100,
        // },
        placeholder: '내용을 입력해주세요.',
        // theme: 'dark',
        data,
        async onChange(api, event) {
          const data = await api.saver.save()
          onChange(data)
        },
      })
      ref.current = editor
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])

  return <div id={holder} className="prose max-w-full" />
}

export default memo(Editor)
