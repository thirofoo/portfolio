import Router from 'next/router'

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Cookieを自動的に送信する設定
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      // login成功時
      console.log('success!!')
      // adminサイトにリダイレクト
      Router.push('/admin')
    } else {
      // login失敗時
      console.log('failed!!')
    }

    // Set-Cookie レスポンスヘッダーに SameSite=None; Secure を設定する
    const headers = response.headers
    const cookies = headers.get('Set-Cookie')
    if (cookies) {
      const updatedCookies = cookies
        .split('; ')
        .map((cookie) => {
          if (cookie.startsWith('SameSite=')) {
            return 'SameSite=None; Secure'
          }
          return cookie
        })
        .join('; ')
      headers.set('Set-Cookie', updatedCookies)
    }
  } catch (error) {
    console.error(error)
  }
}
