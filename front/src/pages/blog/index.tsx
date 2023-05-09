import type { NextPage } from 'next'
import { Button } from '../../components/atoms/Button'
import { Article } from '@/Interfaces/Article'
import { BlogList } from '@/components/molecules/BlogList'
import { getAllArticles } from '@/lib/api/article'

type BlogProps = {
  articles: Article[]
}

const Blog: NextPage<BlogProps> = ({ articles }) => {
  return (
    <>
      <div className={'text-center'}>
        <BlogList articles={articles} from={'blog'} />
      </div>
      <div className={'m-20 flex justify-center'}>
        <Button content='More'></Button>
      </div>
    </>
  )
}

export async function getStaticProps() {
  console.log(process.env.API_URL)
  const articles = await getAllArticles(process.env.API_URL as string)
  return {
    // propsのarticleプロパティにデータを補充してる感じ。
    // buildしたらSSGされる。
    props: {
      articles,
    },
  }
}

export default Blog
