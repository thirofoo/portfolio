import { useState } from 'react'
import { Article } from '@/Interfaces/Article'
import { getAllArticles } from '@/lib/api/article'
import { BlogList } from '@/components/molecules/BlogList'
import { Button } from '@/components/atoms/Button'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCheckAuth } from '@/hooks/useCheckAuth'

const AdminArticlesPage = () => {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])

  useCheckAuth(async () => {
    const fetchedArticles = await getAllArticles(process.env.NEXT_PUBLIC_API_URL || '')
    setArticles(fetchedArticles)
  })

  return (
    <>
      <div className={'flex text-2xl justify-center'}>
        <div className={'p-4'}>
          <Link href={'/admin/articles/create'}>
            <Button content='Create an article' type='button'></Button>
          </Link>
        </div>
        <div className={'p-4'}>
          <Button content='Go back' handleClick={() => router.back()} type='button'></Button>
        </div>
      </div>
      <div className={'text-center'}>
        <BlogList articles={articles} from={'admin/articles'} />
      </div>
    </>
  )
}

export default AdminArticlesPage
