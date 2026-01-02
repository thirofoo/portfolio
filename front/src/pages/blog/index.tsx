import { Article } from '@/Interfaces/Article'
import { CardList } from '@/components/molecules/CardList'
import { getAllArticles } from '@/lib/api/article'
import styles from '@/pages/blog/blog.module.css'
import { GetStaticProps } from 'next'

type BlogProps = {
  articles: Article[]
}

const Blog = ({ articles }: BlogProps) => {
  return (
    <>
      <div>
        <h1 className={styles.title}>Blog</h1>

        <div className={styles.list_wrapper}>
          <CardList articles={articles} from='blog' />
        </div>
        {articles.length === 0 ? (
          <div className={styles.nothing}>No such blog exists.</div>
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
