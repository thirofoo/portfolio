import React from 'react'
import { BlogCard } from './BlogCard'
import { Article } from '@/Interfaces/Article'

type BlogListProps = {
  articles: Article[]
}

export const BlogList = ({ articles }: BlogListProps) => {
  return (
    <>
      <div className={'flex flex-col'}>
        {/* articlesがnullの時の処理も含める */}
        {articles &&
          articles.map((article) => (
            <div key={article.ID} className={'flex m-5 justify-center'}>
              <BlogCard article={article} />
            </div>
          ))}
      </div>
    </>
  )
}
