export const getAllArticles = async () => {
  try {
    const response = await fetch(process.env.API_URL + `/article/get`)
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

export const getOneArticle = async (slug: string) => {
  try {
    const response = await fetch(process.env.API_URL + `/article/get/${slug}`)
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
