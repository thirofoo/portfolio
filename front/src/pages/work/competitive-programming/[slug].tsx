import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Article } from '@/Interfaces/Article'
import { getOneArticle } from '@/lib/api/article'
import { getAllLibraries } from '@/lib/api/library'
import { markdownToHtml } from '@/lib/markdown'
import styles from '@/pages/work/competitive-programming/[slug].module.css'

type BlogProps = {
  article: Article
}

const BlogDetail: NextPage<BlogProps> = ({ article }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1 className={styles.title}>{article.title}</h1>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.body }}></div>
    </>
  )
}

export default BlogDetail

// 動的routingのpathを教える関数
export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllLibraries(process.env.API_URL as string)
  if (!articles) {
    return {
      paths: [],
      fallback: true,
    }
  }
  const paths = articles.map((article: Article) => ({
    params: { slug: article.slug },
  }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  const { slug } = params as { slug: string }
  const article = await getOneArticle(slug, process.env.API_URL as string)
  if (!article) {
    return {
      notFound: true,
    }
  }
  const body = await markdownToHtml(article.body, article.slug)
  article.body = body

  return {
    props: {
      article,
    },
    revalidate: 1,
  }
}
