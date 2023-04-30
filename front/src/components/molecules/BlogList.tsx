import React from 'react'
import { Article } from '@/Interfaces/Article'
import { BlogCard } from '@/components/molecules/BlogCard'

type BlogListProps = {
  articles: Article[]
}

export const BlogList = ({ articles }: BlogListProps) => {
  return (
    <>
      <div className={'m-auto'}>
        {/* articlesがnullの時の処理も含める */}
        {articles &&
          articles.map((article) => (
            <div key={article.ID} className={'inline-flex px-[2vw] mx-[4vw] my-[2rem]'}>
              <BlogCard article={article} />
            </div>
          ))}
      </div>
    </>
  )
}
