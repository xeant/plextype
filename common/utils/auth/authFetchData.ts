const authFetchData = () => {
  // AccessToken과 RefreshToken 추출 (쿠키에서)
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // API 요청에 포함될 헤더 설정
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  // API 요청 보내기
  async function fetchData() {
    try {
      const response = await fetch("/api/auth/endpoint", {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("응답 데이터:", data);
      } else {
        if (response.status === 401) {
          const refreshResponse = await fetch("/api/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          if (refreshResponse.ok) {
            const refreshedData = await refreshResponse.json();
            console.log("갱신된 데이터:", refreshedData);
          } else {
            throw new Error("RefreshToken이 유효하지 않습니다.");
          }
        } else {
          throw new Error("API 요청 실패");
        }
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }
  fetchData();
};

export default authFetchData;
