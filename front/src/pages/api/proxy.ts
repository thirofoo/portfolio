import { NextApiRequest, NextApiResponse } from 'next'

const proxyApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query
  if (typeof url !== 'string') {
    // URLが指定されていない場合
    return res.status(400).end()
  }
  if (req.method !== 'GET') {
    // GET以外のメソッドでアクセスされた場合
    return res.status(405).end()
  }

  try {
    const response = await fetch(url as string)
    if (!response.ok) {
      throw new Error('Failed to fetch image')
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('Response is not an image')
    }

    const imageBuffer = await response.arrayBuffer()
    res.setHeader('Content-Type', contentType)
    res.status(200).send(Buffer.from(imageBuffer))
  } catch (error) {
    console.error('Error fetching image:', error)
    res.status(500).end()
  }
}

export default proxyApi
