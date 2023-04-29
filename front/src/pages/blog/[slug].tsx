import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Article } from '@/Interfaces/Article'
import { getAllArticles, getOneArticle } from '@/lib/api'
import { markdownToHtml } from '@/lib/markdown'
import styles from '@/pages/blog/[slug].module.css'

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

// build時に静的に生成するパスを指定する
// 返り値でnext側に SSGする時のpathを教えてい
export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles()
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

// propsの型定義の為にGetStaticProps<>を利用している
// GetStatic~でSSG化される (getStaticPropsは予約語)
export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  const { slug } = params as { slug: string }
  const article = await getOneArticle(slug)
  if (!article) {
    return {
      notFound: true,
    }
  }

  const body = await markdownToHtml(article.body)
  article.body = body

  return {
    props: {
      article,
    },
    revalidate: 1,
  }
}
