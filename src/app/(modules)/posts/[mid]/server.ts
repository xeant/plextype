interface Data {
  mid: string
  // getData 함수에서 반환되는 다른 속성들을 정의합니다.
}

export const getData = async (mid: string): Promise<Data> => {
  const data: Data = {
    mid: mid,
    // data의 다른 속성들을 초기화합니다.
  }

  const response = await fetch('/api/posts/List', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  const result = await response.json()
  return result
}
