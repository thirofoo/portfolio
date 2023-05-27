import { getUrl } from '@/lib/url'
import { Article } from '@/Interfaces/Article'

export const getAllArticles = async (url: string) => {
  try {
    const response = await fetch(url + `/article/get/blog`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    data.map((article: Article) => {
      if (article.thumbnail == '') article.thumbnail = getUrl('default_vbbudj')
      else article.thumbnail = getUrl(article.slug + '/' + article.thumbnail)
    })
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getOneArticle = async (slug: string, url: string) => {
  try {
    const response = await fetch(url + `/article/get/${slug}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (data.thumbnail == '') data.thumbnail = getUrl('white_nvvrt4')
    else data.thumbnail = getUrl(data.slug + '/' + data.thumbnail)

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
