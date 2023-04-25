import React from 'react'
import { BlogHead } from './BlogHead'
import { Article } from '@/Interfaces/Article'

type BlogListProps = {
  articles: Article[]
}

export const BlogList = ({ articles }: BlogListProps) => {
  return (
    <>
      {/* articlesがnullの時の処理も含める */}
      {articles && articles.map((article) => <BlogHead key={article.ID} article={article} />)}
    </>
  )
}
