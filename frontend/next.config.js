/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'https://luminotech-api.vercel.app/auth/:path*',
      },
    ]
  },
}

module.exports = nextConfig
