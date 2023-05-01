export const handleSubmit = async (username: string, password: string) => {
  try {
    const response = await fetch(process.env.API_URL + `/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      // ログインに成功した場合の処理
    } else {
      // ログインに失敗した場合の処理
    }
  } catch (error) {
    console.error(error)
  }
}
