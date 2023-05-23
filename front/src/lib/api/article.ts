import { getUrl } from '@/lib/url'

export const getAllArticles = async (url: string) => {
  try {
    const response = await fetch(url + `/article/get/blog`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    data.map((article: any) => {
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
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
