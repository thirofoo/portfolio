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
  } catch (error) {
    console.error(error)
  }
}
