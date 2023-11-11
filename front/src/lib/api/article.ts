import { Article } from '@/Interfaces/Article'
import { getUrl } from '@/lib/url'

export const getAllArticles = async (url: string) => {
  try {
    const response = await fetch(url + `/article/get/blog`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    data.map((article: Article) => {
      if (article.thumbnail == '')
        article.thumbnail = getUrl(article.type == 'blog' ? 'default_vbbudj' : 'AtCoder_pyl1be')
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
    if (data.thumbnail == '')
      data.thumbnail = getUrl(data.type == 'blog' ? 'white_nvvrt4' : 'AtCoder_pyl1be')

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
