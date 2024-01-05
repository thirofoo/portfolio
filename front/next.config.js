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
    domains: [
      'res.cloudinary.com',
      'img.atcoder.jp',
      'static.zenn.studio',
      'chokudai.hatenablog.com',
      'ogimage.blog.st-hatena.com',
      'codeforces.org',
      'www.maximum.vc',
      'www.future.co.jp',
    ],
  },
}
