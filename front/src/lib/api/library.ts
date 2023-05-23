import { getUrl } from '@/lib/url'

export const getAllLibraries = async (url: string) => {
  try {
    const response = await fetch(url + `/article/get/library`)
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
