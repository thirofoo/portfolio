import { Article } from '@/Interfaces/Article'
import { getUrl } from '@/lib/url'

export const getAllLibraries = async (url: string) => {
  try {
    const response = await fetch(url + `/article/get/library`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    data.map((article: Article) => {
      // サムネイルがない場合はデフォルトのサムネイルを表示
      if (article.thumbnail == '') article.thumbnail = getUrl('white_nvvrt4')
    })
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
