import cloudinary from '@/lib/cloudinary';

export const generateArticleOgp = (ogpText: string) => {
  const textColor = '#FFFFFF';
  const encodeText = encodeURIComponent(ogpText);
  const fontFamily = 'Arial';
  const imageWidth = 1200;
  const baseFontSize = 80;
  const lineSpacing = 10;
  const fontWeight = 'normal';
  const fontStyle = 'italic';
  const letterSpacing = 4;

  const textLength = ogpText.length;
  const dynamicFontSize = Math.min((imageWidth - textLength * 4) / textLength, baseFontSize);

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
