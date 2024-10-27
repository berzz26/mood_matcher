/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co'], // Allow images from the Spotify CDN
  },
}

module.exports = nextConfig

