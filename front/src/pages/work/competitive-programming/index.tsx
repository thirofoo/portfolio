import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Article } from '@/Interfaces/Article'
import { LibraryList } from '@/components/molecules/LibraryList'
import { getAllLibraries } from '@/lib/api/library'
import styles from '@/pages/work/competitive-programming/library.module.css'

type BlogProps = {
  articles: Article[]
}

const Blog = ({ articles }: BlogProps) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles)
  const [displayNum, setDisplayNum] = useState<number>(1)

  return (
    <>
      <div className={styles.list_wrapper}>
        <LibraryList
          articles={filteredArticles.slice(0, Math.min(4 * displayNum, filteredArticles.length))}
          from='work/competitive-programming'
        />
      </div>
      {filteredArticles.length === 0 ? (
        <div className={styles.nothing}>No such blog exists.</div>
      ) : filteredArticles.length > 4 * displayNum ? (
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
    </>
  )
}

export async function getStaticProps() {
  const articles = await getAllLibraries(process.env.API_URL as string)
  return {
    props: {
      articles,
    },
  }
}

export default Blog
