import { Article } from '@/Interfaces/Article'
import { Button } from '@/components/atoms/Button'
import { CardList } from '@/components/molecules/CardList'
import { getAllArticles } from '@/lib/api/article'
import styles from '@/pages/blog/blog.module.css'
import { GetStaticProps } from 'next'
import { useState } from 'react'

type BlogProps = {
  articles: Article[]
}

const Blog = ({ articles }: BlogProps) => {
  const [displayNum, setDisplayNum] = useState<number>(2)

  return (
    <>
      <div>
        <h1 className={styles.title}>Blog</h1>

        <div className={styles.list_wrapper}>
          <CardList
            articles={articles.slice(0, Math.min(4 * displayNum, articles.length))}
            from='blog'
          />
        </div>
        {articles.length === 0 ? (
          <div className={styles.nothing}>No such blog exists.</div>
        ) : articles.length > 4 * displayNum ? (
          <div className={styles.button_wrapper}>
            <Button
              content='More'
              type='button'
              handleClick={() => {
                setDisplayNum(displayNum + 1)
              }}
            ></Button>
          </div>
        ) : null}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const articles = await getAllArticles(process.env.API_URL as string)
  articles.sort((a: Article, b: Article) => {
    if (a.CreatedAt > b.CreatedAt) return -1
    if (a.CreatedAt < b.CreatedAt) return 1
    return 0
  })
  return {
    props: {
      articles,
    },
  }
}

export default Blog
