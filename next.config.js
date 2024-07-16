/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: 'src/app',
    serverActions: true,
  },
}

module.exports = nextConfig
