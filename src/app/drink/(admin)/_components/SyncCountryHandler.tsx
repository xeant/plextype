"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { syncCountriesAction } from "../_actions/country";

export default function SyncHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shouldSync = searchParams.get("sync") === "true";

  useEffect(() => {
    if (shouldSync) {
      const confirmSync = confirm("전 세계 국가 데이터를 동기화하시겠습니까?");
      if (confirmSync) {
        syncCountriesAction().then((res) => {
          alert(res.message);
          // 동기화 후 URL에서 ?sync=true 제거 (깔끔하게)
          router.replace("/drink/country");
        });
      }
    }
  }, [shouldSync]);

  return null; // 화면엔 안 보임
}
