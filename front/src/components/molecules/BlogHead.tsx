import Link from 'next/link'
import { Article } from '@/Interfaces/Article'

type BlogProps = {
  article: Article
}

export const BlogHead = ({ article }: BlogProps) => {
  return (
    <>
      <div>
        <Link href={`/blog/${article.slug}`}>
          <h2>{article.title}</h2>
        </Link>
        <p>{article.description}</p>
        <p>{article.author}</p>
        <p>{article.thumbnail}</p>
        <p>{article.type}</p>
      </div>
    </>
  )
}
