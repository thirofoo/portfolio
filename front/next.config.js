/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  serverRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/proxy',
      },
      {
        pathname: '/images/**',
      },
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.qiita.com', pathname: '/**' },
      { protocol: 'https', hostname: 'qiita-user-contents.imgix.net', pathname: '/**' },
    ],
    domains: [
      'res.cloudinary.com',
      'cdn.qiita.com',
      'qiita-user-contents.imgix.net',
    ],
  },
}
