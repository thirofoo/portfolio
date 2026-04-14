/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
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
  },
}
