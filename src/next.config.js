/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === 'production'

const withPWA = require("next-pwa")({
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.anyur.com',
      },{
        protocol: 'https',
        hostname: '**.amiverse.net',
      },{
        protocol: 'https',
        hostname: '**.ivecolor.com',
      },{
        protocol: 'https',
        hostname: '**.kisana.me',
      }
    ],
  },
})
