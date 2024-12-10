import cloudinary from '@/lib/cloudinary'

export const generateArticleOgp = (ogpText: string) => {
  const textColor = '#FFFFFF'
  const encodeText = encodeURI(ogpText)
  const fontFamily = 'Arial'
  const fontSize = 100
  const fontWeight = 'bold'
  const fontStyle = 'italic'
  const letterSpacing = 4

  // 第一引数は画像名、第二引数はオプション
  return cloudinary.url('portfolio/ogp.jpg', {
    version: '1733754591',
    transformation: [
      { crop: 'fit', width: '1200' },
      {
        color: `${textColor}`,
        overlay: `text:${fontFamily}_${fontSize}_${fontWeight}_${fontStyle}_${letterSpacing}:${encodeText}`,
        flags: 'layer_apply',
      },
    ],
    secure: true,
    sign_url: true,
  })
}
