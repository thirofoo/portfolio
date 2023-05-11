import type { NextPage } from 'next'
import { Button } from '../../components/atoms/Button'
import { Article } from '@/Interfaces/Article'
import { BlogList } from '@/components/molecules/BlogList'
import { getAllArticles } from '@/lib/api/article'
import styles from '@/pages/blog/blog.module.css'

type BlogProps = {
  articles: Article[]
}

const Blog: NextPage<BlogProps> = ({ articles }) => {
  return (
    <>
      <div className={styles.list_wrapper}>
        <BlogList articles={articles} from={'blog'} />
      </div>
      <div className={styles.button_wrapper}>
        <Button content='More'></Button>
      </div>
    </>
  )
}

// build時にSSG
export async function getStaticProps() {
  console.log(process.env.API_URL)
  const articles = await getAllArticles(process.env.API_URL as string)
  return {
    props: {
      articles,
    },
  }
}

export default Blog
