import React from 'react'
import Link from 'next/link'
import { Article } from '@/Interfaces/Article'

type BlogProps = {
  article: Article
}

export const BlogHead = ({ article }: BlogProps) => {
  return (
    <>
      <div>
        <Link href={`/blog/${article.slug}`} legacyBehavior>
          <a>
            <h2>{article.title}</h2>
          </a>
        </Link>
        <p>{article.description}</p>
        <p>{article.author}</p>
        <p>{article.thumbnail}</p>
        <p>{article.type}</p>
      </div>
    </>
  )
}
