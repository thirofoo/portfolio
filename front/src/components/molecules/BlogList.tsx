import React from 'react'
import Blog from './BlogHead'
import Article from '@/Interfaces/Article'

type BlogListProps = {
  articles: Article[]
}

function BlogList({ articles }: BlogListProps) {
  return (
    <>
      {/* articlesがnullの時の処理も含める */}
      {articles && articles.map((article) => <Blog key={article.ID} article={article} />)}
    </>
  )
}

export default BlogList
