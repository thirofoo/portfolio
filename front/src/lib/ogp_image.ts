import cloudinary from '@/lib/cloudinary';

export const generateArticleOgp = (ogpText: string) => {
  const textColor = '#FFFFFF';
  const encodeText = encodeURIComponent(ogpText);
  const fontFamily = 'Arial';
  const imageWidth = 1200;
  const baseFontSize = 80;
  const lineSpacing = 10;
  const fontWeight = 'normal';
  const fontStyle = 'normal';
  const letterSpacing = 4;

  const calculateTextWidth = (text: string): number => {
    let width = 0;
    for (const char of text) {
      if (char.match(/[a-z0-9\s]/)) {
        // 半角文字・数字
        width += 0.5;
      } else {
        // 全角文字やその他
        width += 1;
      }
    }
    return width;
  };

  const textWidth = calculateTextWidth(ogpText);
  const dynamicFontSize = Math.min((imageWidth - textWidth * 4) / textWidth, baseFontSize);

  return cloudinary.url('portfolio/ogp.jpg', {
    version: '1733754591',
    transformation: [
      { crop: 'fit', width: imageWidth },
      {
        color: textColor,
        overlay: `text:${fontFamily}_${dynamicFontSize}_${fontWeight}_${fontStyle}_${letterSpacing}:${encodeText}`,
        flags: 'layer_apply',
        line_spacing: lineSpacing,
      },
    ],
    secure: true,
    sign_url: true,
  });
};
