import type { NextApiRequest, NextApiResponse } from 'next'

import { markdownToHtml } from '@/lib/markdown'

type PreviewResponse = {
  html?: string
  error?: string
}

const previewApi = async (req: NextApiRequest, res: NextApiResponse<PreviewResponse>) => {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const { markdown, slug } = req.body ?? {}
  if (typeof markdown !== 'string') {
    res.status(400).json({ error: 'Invalid markdown' })
    return
  }

  const safeSlug = typeof slug === 'string' && slug.trim().length > 0 ? slug.trim() : 'preview'

  try {
    const html = await markdownToHtml(markdown, safeSlug)
    res.status(200).json({ html })
  } catch (error) {
    console.error('Preview render failed:', error)
    res.status(500).json({ error: 'Failed to render preview' })
  }
}

export default previewApi
