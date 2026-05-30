/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === 'production'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
})

module.exports = withPWA({
  // Cloudflare Pages static hosting
  // `next build` will output static files into `out/`.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.anyur.com',
      },
      {
        protocol: 'https',
        hostname: '**.amiverse.net',
      },
      {
        protocol: 'https',
        hostname: '**.ivecolor.com',
      },
      {
        protocol: 'https',
        hostname: '**.kisana.me',
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
})
