import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Article } from '@/Interfaces/Article'
import { BlogList } from '@/components/molecules/BlogList'
import { getAllArticles } from '@/lib/api/article'
import styles from '@/pages/blog/blog.module.css'
import { SearchCard } from '@/components/molecules/SearchCard'

type BlogProps = {
  articles: Article[]
}

const Blog = ({ articles }: BlogProps) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles)

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
      <div className={styles.list_wrapper}>Comming Soon ...</div>
      {/* {filteredArticles.length === 0 ? (
        <div className={styles.nothing}>No such blog exists.</div>
      ) : filteredArticles.length < 4 ? (
        <div className={styles.button_wrapper}>
          <Button content='More' type='button'></Button>
        </div>
      ) : null} */}
    </>
  )
}

export async function getStaticProps() {
  const articles = await getAllArticles(process.env.API_URL as string)
  return {
    props: {
      articles,
    },
  }
}

export default Blog
