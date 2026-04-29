/** @type {import('next').NextConfig} */

module.exports = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
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
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/thirofoo/heuristic-archive/**' },
    ],
  },
}
