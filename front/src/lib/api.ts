export const getAllArticles = async () => {
  try {
    const response = await fetch(process.env.API_URL + `/article/get`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // console.log(data)
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
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const handleSubmit = async (username: string, password: string) => {
  try {
    const response = await fetch(process.env.API_URL + `/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // httpsで暗号化されてるから hash化する必要は無し
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      // ログインに成功した場合の処理
      console.log('success!!')
    } else {
      // ログインに失敗した場合の処理
      console.log('failed!!')
    }
  } catch (error) {
    console.error(error)
  }
}
