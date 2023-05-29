import { getUrl } from '@/lib/url'
import { Article } from '@/Interfaces/Article'

export const getAllLibraries = async (url: string) => {
  try {
    const response = await fetch(url + `/article/get/library`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    data.map((article: Article) => {
      if (article.thumbnail == '') article.thumbnail = getUrl('white_nvvrt4')
      else article.thumbnail = getUrl(article.slug + '/' + article.thumbnail)
    })
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
