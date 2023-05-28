import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { GetStaticProps } from 'next'
import { Article } from '@/Interfaces/Article'
import { LibraryList } from '@/components/molecules/LibraryList'
import { getAllLibraries } from '@/lib/api/library'
import styles from '@/pages/blog/blog.module.css'
import { SearchCard } from '@/components/molecules/SearchCard'

type BlogProps = {
  articles: Article[]
}

const Blog = ({ articles }: BlogProps) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles)
  const [isSearchCardExpanded, setSearchCardExpanded] = useState(false)
  const [displayNum, setDisplayNum] = useState<number>(1)

  const handleSearch = (title: string, tag: string) => {
    let fil: Article[] = articles

    const tags = tag.split(',')

    fil = fil.filter((article: Article) => {
      return article.title.toLowerCase().includes(title.toLowerCase())
    })
    fil = fil.filter((article: Article) => {
      // 複数tagがある場合はAND検索
      return tags.every((t: string) => {
        return article.Tags.some((tag) => tag.name.includes(t))
      })
    })
    setFilteredArticles(fil)
  }

  return (
    <>
      <div className={isSearchCardExpanded ? styles.down : styles.up}>
        <div className={styles.search_wrapper}>
          <div className={`duration-500 ${isSearchCardExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <SearchCard onSearch={handleSearch} items={['Title', 'Tags']} />
          </div>
          <button
            className={`${styles.toggle_button}`}
            onClick={() => {
              if (isSearchCardExpanded) setFilteredArticles(articles)
              setSearchCardExpanded(!isSearchCardExpanded)
            }}
          >
            Search
            <span className={`${isSearchCardExpanded ? styles.arrow_down : styles.arrow_up}`}>
              ↓
            </span>
          </button>
        </div>

        <div className={styles.list_wrapper}>
          <LibraryList
            articles={filteredArticles.slice(0, Math.min(8 * displayNum, filteredArticles.length))}
            from='work/competitive-programming'
          />
        </div>
        {filteredArticles.length === 0 ? (
          <div className={styles.nothing}>No such blog exists.</div>
        ) : filteredArticles.length > 8 * displayNum ? (
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
  const articles = await getAllLibraries(process.env.API_URL as string)
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
