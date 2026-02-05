// src/app/drink/page.tsx

import Link from "next/link";

export default function DrinkPage() {
  // 나중에는 이 데이터를 DB(Prisma)에서 가져올 겁니다. 지금은 가짜 데이터!
  const dummyDrinks = [
    { id: 1, name: "발베니 12년", type: "Whiskey", alcohol: 40, image: "/storage/balvenie.jpg" },
    { id: 2, name: "참이슬 후레쉬", type: "Soju", alcohol: 16.5, image: "/storage/cham.jpg" },
    { id: 3, name: "테라", type: "Beer", alcohol: 4.6, image: "/storage/terra.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 상단 헤더 영역 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🍷 술 저장소</h1>
          <p className="text-gray-500 mt-2">내가 마신 술, 마실 술을 기록하는 공간</p>
        </div>
        
        <Link 
          href="/drink/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + 술 등록하기
        </Link>
      </div>

      {/* 술 목록 리스트 (그리드 형태) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyDrinks.map((drink) => (
          <div key={drink.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
            {/* 이미지 영역 (임시 회색 박스) */}
            <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
               {/* 나중엔 여기에 실제 <Image /> 태그가 들어감 */}
               <span>이미지 없음</span>
            </div>
            
            {/* 정보 영역 */}
            <div className="p-4">
              <div className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-1">
                {drink.type}
              </div>
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {drink.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                도수: {drink.alcohol}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}