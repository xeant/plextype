"use client";

import React from "react";
import DrinkHeader from "@/layouts/drink/Layout"; // 경로가 맞는지 확인하세요!

export default function DrinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <DrinkHeader />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}