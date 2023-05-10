type AuthCheckResponse = { ok: boolean }

export const checkAuth = async (): Promise<AuthCheckResponse> => {
  // token=~ の ~部分を取り出す正規表現
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/admin/check-auth', {
    method: 'POST',
    headers: headers,
    credentials: 'include',
  })

  if (!response.ok) {
    return { ok: false }
  }

  return { ok: true }
}
