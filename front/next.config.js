/** @type {import('next').NextConfig} */

const webpack = require('webpack')

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // 環境変数を追加する ( webpackのbundle時に環境変数を埋め込む )
    // ※ ailiasを定義してる感じ
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.NEXT_PUBLIC_API_URL),
      }),
    )

    return config
  },
}

module.exports = nextConfig
