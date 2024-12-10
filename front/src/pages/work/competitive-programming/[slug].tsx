import { ArticleView } from '@/components/organisms/ArticleView'
import { Article } from '@/Interfaces/Article'
import { getOneArticle } from '@/lib/api/article'
import { getAllLibraries } from '@/lib/api/library'
import { markdownToHtml } from '@/lib/markdown'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

type BlogProps = {
  article: Article
}

const BlogDetail: NextPage<BlogProps> = ({ article }) => {
  return (
    <ArticleView article={article} />
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
