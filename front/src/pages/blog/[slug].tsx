import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Article } from '@/Interfaces/Article'
import { getAllArticles, getOneArticle } from '@/lib/api'

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
      <h1>{article.title}</h1>
      <p>{article.body}</p>
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
// GetStatic~でSSG化される
export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  const { slug } = params as { slug: string }
  const article = await getOneArticle(slug)
  return { props: { article } }
}
