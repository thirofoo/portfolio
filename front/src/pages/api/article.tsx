// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// セキュリティや保守性を高める為に、/api のendpointを作成するっぽい

import { url } from 'inspector'
import type { NextApiRequest, NextApiResponse } from 'next'

type Article = {
  ID: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  title: string
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Article[]>
) {
  await fetch(process.env.API_URL+'/article/get', { mode: 'cors' })
    .then((r) => r.json())
    .then((json) => {
      console.log(json)
      res.status(200).json(json)
    })
    .catch((err) => {
      console.log(err)
    })
}