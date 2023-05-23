import React from 'react'
import { Article } from '@/Interfaces/Article'
import { LibraryCard } from '@/components/molecules/LibraryCard'
import styles from '@/components/molecules/BlogList.module.css'

type LibraryListProps = {
  articles: Article[]
  from: string
}

export const LibraryList = ({ articles, from }: LibraryListProps) => {
  return (
    <>
      {articles &&
        articles.map((article) => (
          <div key={article.ID} className={styles.card}>
            <LibraryCard article={article} from={from} />
          </div>
        ))}
    </>
  )
}
