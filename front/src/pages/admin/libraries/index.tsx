import { Article } from '@/Interfaces/Article'
import { Button } from '@/components/atoms/Button'
import { CardList } from '@/components/molecules/CardList'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { getAllLibraries } from '@/lib/api/library'
import { useRouter } from 'next/router'
import { useState } from 'react'

const AdminArticlesPage = () => {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])

  useCheckAuth(async () => {
    const fetchedArticles = await getAllLibraries(process.env.NEXT_PUBLIC_API_URL || '')
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
        <CardList articles={articles} from={'admin/libraries'} />
      </div>
    </>
  )
}

export default AdminArticlesPage
