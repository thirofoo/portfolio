import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Article } from '@/Interfaces/Article'
import { BlogList } from '@/components/molecules/BlogList'
import { getAllArticles } from '@/lib/api/article'
import styles from '@/pages/blog/blog.module.css'
import { TagSearchCard } from '@/components/molecules/TagSearchCard'

type BlogProps = {
  articles: Article[]
}

const Blog = ({ articles }: BlogProps) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles)

  const handleTagSearch = (tag: string) => {
    if (tag === '') return setFilteredArticles(articles)
    const filtered = articles.filter((article) => article.Tags.some((t) => t.name === tag))
    setFilteredArticles(filtered)
  }

  return (
    <>
      <div className={styles.button_wrapper}>
        <TagSearchCard onSearch={handleTagSearch} />
      </div>
      <div className={styles.list_wrapper}>
        <BlogList articles={filteredArticles} from='blog' />
      </div>
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
