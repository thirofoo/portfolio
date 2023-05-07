import { IncomingMessage } from 'http'
import { parseCookies } from 'nookies'

type AuthCheckResponse = {
  ok: boolean
}

export const checkAuth = async (req?: IncomingMessage): Promise<AuthCheckResponse> => {
  const cookies = parseCookies({ req })
  const token = cookies.token

  if (!token) {
    return { ok: false }
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(process.env.API_URL + '/admin/check-auth', {
    method: 'POST',
    headers: headers,
  })

  if (!response.ok) {
    return { ok: false }
  }

  return { ok: true }
}
