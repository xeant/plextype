import { Metadata } from "next";
import DrinkHeader from "./header"; // 경로 확인 필요!

export const metadata: Metadata = {
  title: "Honsool Life - 드링크",
  description: "혼술 라이프를 위한 주류 정보",
};

export default function RootDrinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* 이제 여기서 헤더를 불러옵니다 */}
      <DrinkHeader />
      <main className="min-h-screen bg-gray-50/50">
          {children}
      </main>
    </div>
  );
}