/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Docker/PM2 실행 시 최적화
  reactStrictMode: true,

  // 이미지 보안 설정: 외부 호스트 허용
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // 구글 프로필 이미지 등
      },
    ],
  },

  // TypeScript 및 빌드 설정
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },

  // 실험적 기능 (필요 시 주석 해제)
  experimental: {
    // appDir: true, // 최신 버전에서는 기본값이므로 생략 가능
    // serverActions: true,
  },
};

module.exports = nextConfig;
