import { getUrl } from "@/lib/url"

export interface Article {
  ID: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  title: string
  slug: string
  description: string
  author: string
  thumbnail: string
  Tags: {
    ID: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
    name: string
  }[]
  type: string
  body: string
}

export const createEmptyArticle = (): Article => {
  return {
    ID: '',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: '',
    title: '',
    slug: '',
    description: '',
    author: '',
    thumbnail: getUrl('white_nvvrt4'),
    Tags: [],
    type: '',
    body: '',
  }
}

export interface ArticleInput {
  title: string
  slug: string
  description: string
  body: string
  author: string
  thumbnail: string
  type: string
  tags: string[]
}
