import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Article } from '@/Interfaces/Article'
import { LibraryList } from '@/components/molecules/LibraryList'
import { getAllLibraries } from '@/lib/api/library'
import styles from '@/pages/work/competitive-programming/library.module.css'
import { SearchCard } from '@/components/molecules/SearchCard'

type BlogProps = {
  articles: Article[]
}

const Blog = ({ articles }: BlogProps) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles)
  const [displayNum, setDisplayNum] = useState<number>(1)

  const handleSearch = (title: string, tag: string) => {
    let fil: Article[] = articles

    fil = fil.filter((article) => {
      return article.title.toLowerCase().includes(title.toLowerCase())
    })
    fil = fil.filter((article) => {
      return article.Tags.some((t) => t.name.includes(tag))
    })

    setFilteredArticles(fil)
  }

  return (
    <>
      <SearchCard onSearch={handleSearch} items={['Title', 'Tags']} />
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
