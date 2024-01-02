import { Ogp } from '@/Interfaces/Ogp'
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
    }
    return ogpInfo
  } catch (error) {
    console.error('Error fetching OGP information:', error)
    return null
  }
}
