import Router from 'next/router'

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const data = await response.json()

    if (response.ok) {
      // login成功時
      const { token } = data

      // tokenをCookieに保存する (vercel側からを送る場合の属性指定)
      const expire = new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiration
      const cookieOptions = {
        path: '/',
        expires: expire,
        sameSite: 'none',
        secure: true,
      }
      document.cookie = `token=${token};${Object.entries(cookieOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join(';')}`

      // adminサイトにリダイレクト
      Router.push('/admin')
      console.log('Login success')
    } else {
      // login失敗時
      console.log('Login failed')
      console.log('error message: %s', data.error)
    }
  } catch (error) {
    console.error(error)
  }
}
