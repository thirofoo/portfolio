import React from 'react'
import { Article } from '@/Interfaces/Article'
import { BlogCard } from '@/components/molecules/BlogCard'

type BlogListProps = {
  articles: Article[]
  from: string
}

export const BlogList = ({ articles, from }: BlogListProps) => {
  return (
    <>
      <div className={'m-auto'}>
        {/* articlesがnullの時の処理も含める */}
        {articles &&
          articles.map((article) => (
            <div key={article.ID} className={'inline-flex px-[2vw] mx-[2rem] my-[2rem]'}>
              <BlogCard article={article} from={from} />
            </div>
          ))}
      </div>
    </>
  )
}
