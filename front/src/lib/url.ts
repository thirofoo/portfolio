export const getUrl = (public_id: string): string => {
  return (
    'https://res.cloudinary.com/' +
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME +
    '/image/upload/v1684482420/portfolio/' +
    public_id
  )
}

export const extractSlugFromURL = (url: string): string => {
  // URLから https://~~//... の ~~ だけを抽出する
  // ※ 文字列が URL でないなら空白を返す
  if (!url.match(/^https?:\/\//)) return ''
  const urlObj = new URL(url)
  return urlObj.origin.substring(urlObj.origin.lastIndexOf('//') + 2)
}
