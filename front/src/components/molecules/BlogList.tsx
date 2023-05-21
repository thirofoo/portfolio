import React from 'react'
import { Article } from '@/Interfaces/Article'
import { BlogCard } from '@/components/molecules/BlogCard'
import styles from '@/components/molecules/BlogList.module.css'

type BlogListProps = {
  articles: Article[]
  from: string
}

export const BlogList = ({ articles, from }: BlogListProps) => {
  return (
    <>
      {articles &&
        articles.map((article) => (
          <div key={article.ID} className={styles.card}>
            <BlogCard article={article} from={from} />
          </div>
        ))}
    </>
  )
}
