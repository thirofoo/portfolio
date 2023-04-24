export const getAllArticles = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/article')
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}
