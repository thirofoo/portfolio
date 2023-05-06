import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { checkAuth } from '@/lib/auth'
import { Article } from '@/Interfaces/Article'
import { getAllArticles } from '@/lib/api/article'
import type { GetServerSidePropsContext } from 'next'
import type { NextPage } from 'next'
import { BlogList } from '@/components/molecules/BlogList'
import { Button } from '@/components/atoms/Button'

type Props = {
  articles: Article[]
}

const AdminArticlesPage: NextPage<Props> = ({ articles }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id: string) => {
    setLoading(true)
    // TODO: 記事の削除処理を実装
    setLoading(false)
  }

  return (
    <>
      <div className={'text-center'}>
        <BlogList articles={articles} from={'admin/articles'} />
      </div>
      <div className={'m-20 flex justify-center'}>
        <Button content='More'></Button>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext,
) => {
  const auth = await checkAuth(context.req)
  if (!auth.ok) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  const articles = await getAllArticles()
  return {
    props: {
      articles,
    },
  }
}

export default AdminArticlesPage
