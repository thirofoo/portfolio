interface Article {
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
export default Article
