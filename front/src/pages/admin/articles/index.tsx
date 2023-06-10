import { Article } from '@/Interfaces/Article'
import { Button } from '@/components/atoms/Button'
import { BlogList } from '@/components/molecules/BlogList'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { getAllArticles } from '@/lib/api/article'
import { useRouter } from 'next/router'
import { useState } from 'react'

const AdminArticlesPage = () => {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])

  useCheckAuth(async () => {
    const fetchedArticles = await getAllArticles(process.env.NEXT_PUBLIC_API_URL || '')
    setArticles(fetchedArticles)
  }, router)

  return (
    <>
      <div className={'flex text-2xl justify-center'}>
        <div className={'p-4'}>
          <Button
            content='Go back'
            handleClick={() => router.push('/admin')}
            type='button'
          ></Button>
        </div>
      </div>
      <div className={'text-center'}>
        <BlogList articles={articles} from={'admin/articles'} />
      </div>
    </>
  )
}

export default AdminArticlesPage
