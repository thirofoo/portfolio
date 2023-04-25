import type { NextPage } from 'next'
import { Button } from '../../components/atoms/Button'
import { BlogList } from '@/components/molecules/BlogList'
import { Article } from '@/Interfaces/Article'
import { getAllArticles } from '@/lib/api'

type BlogProps = {
  articles: Article[]
}

const Blog: NextPage<BlogProps> = ({ articles }) => {
  return (
    <>
      <div className={'text-center text-4xl p-10'}>
        <BlogList articles={articles} />
      </div>
      <div className={'m-20 flex justify-center'}>
        <Button content='More'></Button>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const articles = await getAllArticles()
  return {
    // propsのarticleプロパティにデータを補充してる感じ。
    // buildしたらSSGされる。
    props: {
      articles,
    },
  }
}

export default Blog
