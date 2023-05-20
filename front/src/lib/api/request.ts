import { parseCookies } from 'nookies'

export const fetchWithToken = async (url: string, method: string, body: any): Promise<Response> => {
  const cookies = parseCookies()
  const token = cookies.token

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  return response
}
