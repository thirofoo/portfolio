import { Ogp } from '@/Interfaces/Ogp'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cheerio from 'cheerio-without-node-native'

export async function fetchOGPInfo(url: string): Promise<Ogp | null> {
  try {
    // URL 先の HTML を取得
    const htmlResponse = await fetch(url)
    const htmlText = await htmlResponse.text()

    // HTML から OGP の情報を抽出
    const $ = cheerio.load(htmlText)
    const ogpInfo: Ogp = {
      title: $('meta[property="og:title"]').attr('content') || '',
      description: $('meta[property="og:description"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || '',
      site_name: $('meta[property="og:site_name"]').attr('content') || '',
      type: $('meta[property="og:type"]').attr('content') || '',
      url: $('meta[property="og:url"]').attr('content') || '',
      icon:
        $('link[rel="icon"]').attr('href') ||
        $('link[rel="shortcut icon"]').attr('href') ||
        $('link[rel="apple-touch-icon"]').attr('href') ||
        '',
    }
    // icon のパターンに対応
    const origin = new URL(url).origin
    if (ogpInfo.icon.startsWith('//')) {
      // origin から始まるケース
      ogpInfo.icon = 'https:' + ogpInfo.icon
    } else if (ogpInfo.icon.startsWith('/')) {
      // origin 配下から始まるケース
      ogpInfo.icon = origin + ogpInfo.icon
    } else if (ogpInfo.icon.startsWith('.')) {
      // 相対パスのケース
      const path = new URL(url).pathname
      const pathArray = path.split('/')
      pathArray.pop()
      const pathDir = pathArray.join('/')
      ogpInfo.icon = origin + pathDir + '/' + ogpInfo.icon
    }
    return ogpInfo
  } catch (error) {
    console.error('Error fetching OGP information:', error)
    return null
  }
}
