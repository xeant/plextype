
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Honsool Life - 관리자",
  description: "혼술 라이프를 위한 주류 정보",
};


export default function DrinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="bg-red-500 h-[2]"></div>
         <div className="max-w-7xl mx-auto py-8 px-6">
        {children}
        </div>
      </div>
    </div>
  );
}