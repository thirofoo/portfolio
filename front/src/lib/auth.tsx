type AuthCheckResponse = { ok: boolean }
import { NextRouter } from 'next/router'

export const checkAuth = async (router: NextRouter): Promise<AuthCheckResponse> => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/admin/check-auth', {
      method: 'POST',
      headers: headers,
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Authentication failed')
    }

    return { ok: true }
  } catch (error) {
    // CORSで弾かれた時の処理
    router.push('/login')
    // Promise.rejectを返すことで呼び出し元で error handling を可能にする
    return Promise.reject({ ok: false })
  }
}
