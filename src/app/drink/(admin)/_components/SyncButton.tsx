"use client";

import { useState } from "react";
import { syncCountriesAction } from "../_actions/country";

export default function SyncButton() {
  const [isPending, setIsPending] = useState(false);

  const handleSync = async () => {
    if (!confirm("외부 API로부터 국가 목록을 가져와 동기화하시겠습니까?"))
      return;

    setIsPending(true);
    const result = await syncCountriesAction();
    setIsPending(false);

    if (result.success) {
      alert(result.message);
    } else {
      alert("에러 발생: " + result.message);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={isPending}
      className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
        isPending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {isPending ? "동기화 중..." : "국가 데이터 동기화"}
    </button>
  );
}
