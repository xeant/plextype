import Image from "next/image";

const Page = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-lg px-3 pb-3 pt-12">
        <div className="line-clamp-1 text-2xl font-semibold text-black dark:text-white">
          Launch Your Service. Get Started
        </div>
      </div>
      <div className="dark:bg-dark-950/70 z-50 w-full">
        <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-8 px-3 py-4">
          <div className="flex items-center gap-4">
            <div className="">
              <div className="dark:bg-dark-800 dark:hover:bg-dark-700 h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200"></div>
            </div>
            <div>
              <div className="line-clamp-1 text-sm font-medium text-black dark:text-white">
                지지에웍스
              </div>
              <div className="dark:text-dark-400 line-clamp-1 text-xs text-gray-400">
                악세사리
              </div>
            </div>
          </div>
          <div className="dark:hover:bg-dark-300 flex cursor-pointer items-center gap-1 rounded-full bg-gray-950 px-8 py-2 text-white hover:bg-gray-700 dark:bg-white dark:text-black">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="hidden text-sm md:flex">장바구니</div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-0 pt-5 lg:px-3">
        <div className="dark:bg-dark-600 relative h-[calc(100vh-157px)] overflow-hidden rounded-none bg-gray-100/10 bg-[url('/assets/images/bg37.jpg')] bg-cover bg-bottom bg-no-repeat lg:h-[550px] lg:rounded-2xl ">
          <div className="absolute inset-0 z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 z-20 lg:bottom-3">
            <div className="relative px-3 pb-3 lg:px-0">
              <div className="dark:bg-dark-900/20 dark:from-dark-900/30 dark:via-dark-900/70 to-dark-950 mx-auto max-w-screen-md rounded-lg bg-white/20 bg-gradient-to-b p-3 backdrop-blur-lg ">
                <div className="flex flex-wrap gap-4 lg:gap-8">
                  <div className="dark:shadow-dark-950/40 bg-primary-400 mx-auto -mt-12 h-20 w-20 rounded-2xl shadow-lg shadow-gray-600/30 backdrop-blur-lg md:mt-0"></div>
                  <div className="flex w-full flex-wrap md:flex-1">
                    <div className="w-full">
                      <div className="line-clamp-1 text-lg font-semibold text-white dark:text-white">
                        Dynamic Property Applications
                      </div>
                      <div className="dark:text-dark-500 mb-1 line-clamp-1 font-light text-gray-100">
                        지제이웍스 웹애플리케이션
                      </div>
                    </div>
                    <div className="flex w-full items-center gap-2">
                      <div className="cursor-pointer rounded-full bg-white px-4 py-1 text-xs text-black hover:bg-gray-100">
                        150,000 원
                      </div>
                      <div className="cursor-pointer rounded-full bg-black px-4 py-1 text-xs text-white hover:bg-gray-700">
                        미리보기
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-3 pt-6 lg:pt-10">
        <div className="flex flex-wrap gap-8">
          <div className="lg:order-0 order-1 mx-auto max-w-screen-md">
            <div className="">
              <div className="pb-10">
                <div className="dark:border-dark-800/75 dark:bg-dark-700/40 mb-8 hidden rounded-lg border border-gray-200/50 bg-white/90 p-5 shadow-md shadow-gray-100/75 dark:shadow-black/90">
                  <div className="grid grid-cols-4 gap-10">
                    <div className="col-span-1">
                      <div className="text-primary-500 mb-3 text-base">
                        1,200
                      </div>
                      <div className="text-dark-400 text-sm">
                        Download Count
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="text-primary-400 mb-3 text-base">
                        1,200
                      </div>
                      <div className="text-dark-400 text-sm">Like Count</div>
                    </div>
                    <div className="col-span-1">
                      <div className="text-primary-400 mb-3 text-base">
                        1,200
                      </div>
                      <div className="text-dark-400 text-sm">Review Count</div>
                    </div>
                    <div className="col-span-1">
                      <div className="text-primary-400 mb-3 text-base">
                        1,200
                      </div>
                      <div className="text-dark-400 text-sm">Readed Count</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8 text-xl text-black dark:text-white">
                  잔재된 기운
                </div>
                <div className="dark:text-dark-300 mb-5 text-base font-light font-light text-gray-700">
                  잔재 블레이드의 요소들을 각각 뜯어보면 A급이나 S급으로 보기는
                  힘든 부족한 요소는 있어도 D급 이하의 폐급 요소는 찾아보기
                  어렵다. 딜량도 준수하고, 지속무력수치와 부위파괴 수치는 매우
                  좋다. 다크 악셀이라는 보스를 넘을수 있는 S급 기동기에 보조
                  이동기로 스핀커터 등이 있고, 소울 앱소버도 쓰기에 따라선 준
                  이동기로 활용가능하며, 잔재된 기운과 마엘스톰에 이속증가
                  버프가 있어서 이동기, 이동속도면에서도 준수하다. 체방지수도
                  이동능력이 받혀주는 근접 딜러중에서는 좋은편에 속한다.
                  서포터나 느려빠진 워로드, 디트등의 논외의 대상을 제외하면
                  몸빵도 좋은편. 백헤드 버프 수치는 2023년 1월에 너프를 먹긴
                  했지만 그래도 마엘스톰과 스핀커터 덕분에 팀에게 주는 시너지
                  버프도 1인분 이상은 한다. 더군다나 차징기에는 전부 경직면역이
                  붙어있고, 빠르게 아이덴티티 게이지를 채워서 때리는 버스트에는
                  피격이상면역까지 붙어있어서 피면기와 경면기도 많다. 여기다
                  심지어 인기 많은 여캐중 하나라서 커마까지 괜잖다. 딜링, 몸빵,
                  무력, 부위파괴, 이동기, 이동속도, 피면기, 경면기, 팀 시너지,
                  외관까지 어딜 뜯어봐도 최소 1인분 이상은 하는 나사 빠진것 같은
                  요소를 찾기 어려운 직업. 덕분에 성능과 별개로 유저들 사이에서
                  인식이 좋은 편이기 때문에 레이드 파티 구직중에도 블레이드라는
                  이유만으로 기피되는 경우는 많지 않다.
                </div>
                <div className="dark:text-dark-300 mb-5 text-base font-light text-gray-700">
                  잔재된 기운은 아츠 상태의 쿨타임 감소와 잔재된 기운의 공이속
                  효과로 인해 고특화 클래스임에도 신속 클래스 처럼 빠르고
                  지속적으로 몰아치는 플레이가 가능하다. 끊임없이 아이덴티티를
                  사용하고 회복하기 때문에 블레이드의 핵심 시너지 스킬인
                  마엘스톰 가동률도 높아진다.
                </div>
              </div>
              <div className="dark:bg-dark-600 relative mb-8 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  alt="content images"
                  src="/assets/images/bg37.jpg"
                  width="768"
                  height="368"
                  loading="lazy"
                  className="rounded-2xl"
                />
              </div>
              <div className="py-10">
                <div className="mb-8 text-xl text-black dark:text-white">
                  버스트
                </div>
                <div className="dark:text-dark-300 mb-5 text-base font-light text-gray-700">
                  적절히 스택을 쌓은 뒤 각종 각인과 특성, 사멸 장비 효과까지
                  받은 버스트 스킬은 로스트아크 내의 손에 꼽을 정도로 강력한
                  한방 딜링을 자랑한다. 사실상 딜의 대부분이 버스트에 몰려있고,
                  남은 스킬중 딜링을 내는 스킬이라 해봤자 두개정도에 얼마 하지도
                  않으니 버스트와 소울 앱소버, 블리츠 러시에만 멸화를 주고
                  홍염을 빙 둘러 빠른 템포로 딜을 욱여넣는 플레이가 가능하다.
                  또한 이로 인해 버스트를 제외한 다른 스킬이 빗나가는것은 거의
                  문제가 되지 않고, 사이클형 딜러임에도 스킬이 빗나가는것을
                  커버쳐줄 여유로운 스킬 구조나 보이드의 우수한 아덴 수급력을
                  근거로 하여 딜로스 직전 버스트를 활용하고 부족한 아덴을 따로
                  수급, 뎀감상태에서 추가로 스택을 쌓아나가는 등 일반적으로 그
                  고점을 유저의 숙련도로 받쳐줄 수 없다 평가되는 잔재와 달리
                  유저의 숙련도만 있다면 극한의 성능을 곧이 곧대로 보여줄 수
                  있는 편이다.
                </div>
                <div className="dark:text-dark-300 mb-5 text-base font-light text-gray-700">
                  트라이포드에 영향을 전혀받지 않고 자체 스킬 성능, 속칭 깡통
                  성능만의 영향을 받는 보정에서 버스트는 꽤나 좋은 모습을
                  보인다. 잔재처럼 아이덴티티 게이지 수급에 목메지 않아도 되고,
                  버스트 단발만 온전히 박아낼 수 있다면 보정에서는 꽤 괜찮은
                  딜러로 평가받을 정도로 성능을 뽑아내는 편.
                </div>
              </div>
              <div className=" order-0 w-full pb-20 lg:order-1">
                <div className="">
                  <div className="dark:border-dark-700 rounded-lg border border-gray-200 p-5">
                    <div className="mb-5 text-base text-gray-950 dark:text-white">
                      제품 정보
                    </div>
                    <div className="mb-3 flex text-sm">
                      <div className="dark:text-dark-200 w-20 text-gray-700">
                        카테고리
                      </div>
                      <div className="dark:text-dark-400 text-gray-400">
                        SOFTWARE / ADOBE / ADOBE
                      </div>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <div className="dark:text-dark-200 w-20 text-gray-700">
                        버전
                      </div>
                      <div className="dark:text-dark-400 text-gray-400">
                        0.1ver
                      </div>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <div className="dark:text-dark-200 w-20 text-gray-700">
                        환경
                      </div>
                      <div className="dark:text-dark-400 text-gray-400">
                        node 16.15.0 이상, npm 8.5.5 이상
                      </div>
                    </div>
                    <div className="flex text-sm">
                      <div className="dark:text-dark-200 w-20 text-gray-700">
                        제작자
                      </div>
                      <div className="dark:text-dark-400 text-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:bg-dark-900 h-1 bg-gray-100"></div>
      <div className="mx-auto max-w-screen-md px-3 pt-10">
        <div className="mb-5 text-lg text-black dark:text-white">
          Comments (1)
        </div>
        <div className="dark:bg-dark-700/40 dark:text-dark-500 mb-10 flex justify-center rounded-lg bg-gray-100 p-5 text-sm text-gray-400">
          Comment Editor
        </div>
        <div className="pb-20">
          <div className="dark:border-dark-800 border-b border-gray-200 py-10">
            <div className="flex gap-4">
              <div className="dark:bg-dark-700 h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-4">
                  <div className="dark:text-dark-100 text-base font-semibold text-gray-700">
                    Coreamericano
                  </div>
                  <div className="dark:text-dark-500 text-xs text-gray-400">
                    1일전
                  </div>
                </div>
                <div className="dark:text-dark-400 text-sm font-light text-gray-500">
                  트라이포드에 영향을 전혀받지 않고 자체 스킬 성능, 속칭 깡통
                  성능만의 영향을 받는 보정에서 버스트는 꽤나 좋은 모습을
                  보인다. 잔재처럼 아이덴티티 게이지 수급에 목메지 않아도 되고,
                  버스트 단발만 온전히 박아낼 수 있다면 보정에서는 꽤 괜찮은
                  딜러로 평가받을 정도로 성능을 뽑아내는 편.
                </div>
                <div className="flex items-center justify-between gap-4 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs">
                      <div className="text-rose-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </div>
                      <div className="dark:text-dark-500 text-gray-400">
                        56 Likes
                      </div>
                    </div>

                    <div className="dark:text-dark-500 text-xs text-gray-400">
                      Reply
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="dark:text-dark-500 text-xs text-gray-400">
                      Modify
                    </div>
                    <div className="dark:text-dark-500 text-xs text-gray-400">
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-4 pl-12 pt-10">
                <div className="dark:bg-dark-700 h-8 w-8 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-4">
                    <div className="dark:text-dark-100 text-base font-semibold text-gray-700">
                      Coreamericano
                    </div>
                    <div className="dark:text-dark-500 text-xs text-gray-400">
                      1일전
                    </div>
                  </div>
                  <div className=" dark:text-dark-400 text-sm font-light text-gray-500">
                    트라이포드에 영향을 전혀받지 않고 자체 스킬 성능, 속칭 깡통
                    성능만의 영향을 받는 보정에서 버스트는 꽤나 좋은 모습을
                    보인다. 잔재처럼 아이덴티티 게이지 수급에 목메지 않아도
                    되고, 버스트 단발만 온전히 박아낼 수 있다면 보정에서는 꽤
                    괜찮은 딜러로 평가받을 정도로 성능을 뽑아내는 편.
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <div className="dark:text-dark-500 flex items-center gap-1 text-xs text-gray-400">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </div>
                      <div>56 Likes</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pl-12 pt-10">
                <div className="dark:bg-dark-700 h-8 w-8 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-4">
                    <div className="dark:text-dark-100 text-base font-semibold text-gray-700">
                      Coreamericano
                    </div>
                    <div className="dark:text-dark-500 text-xs text-gray-400">
                      1일전
                    </div>
                  </div>
                  <div className=" dark:text-dark-400 text-sm font-light text-gray-500">
                    트라이포드에 영향을 전혀받지 않고 자체 스킬 성능, 속칭 깡통
                    성능만의 영향을 받는 보정에서 버스트는 꽤나 좋은 모습을
                    보인다. 잔재처럼 아이덴티티 게이지 수급에 목메지 않아도
                    되고, 버스트 단발만 온전히 박아낼 수 있다면 보정에서는 꽤
                    괜찮은 딜러로 평가받을 정도로 성능을 뽑아내는 편.
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <div className="dark:text-dark-500 flex items-center gap-1 text-xs text-gray-400">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </div>
                      <div>56 Likes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-10">
            <div className="flex gap-4">
              <div className="dark:bg-dark-700 h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-4">
                  <div className="dark:text-dark-100 text-base font-semibold text-gray-700">
                    Coreamericano
                  </div>
                  <div className="dark:text-dark-500 text-xs text-gray-400">
                    1일전
                  </div>
                </div>
                <div className=" dark:text-dark-400 text-sm font-light text-gray-500">
                  트라이포드에 영향을 전혀받지 않고 자체 스킬 성능, 속칭 깡통
                  성능만의 영향을 받는 보정에서 버스트는 꽤나 좋은 모습을
                  보인다. 잔재처럼 아이덴티티 게이지 수급에 목메지 않아도 되고,
                  버스트 단발만 온전히 박아낼 수 있다면 보정에서는 꽤 괜찮은
                  딜러로 평가받을 정도로 성능을 뽑아내는 편.
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <div className="dark:text-dark-500 flex items-center gap-1 text-xs text-gray-400">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                    <div>56 Likes</div>
                  </div>
                  <div className="text-dark-500 text-xs">Reply</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
