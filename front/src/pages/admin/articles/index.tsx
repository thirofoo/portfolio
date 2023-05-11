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
  const [loading, setLoading] = useState(false)

  useCheckAuth(async () => {
    const fetchedArticles = await getAllArticles(process.env.NEXT_PUBLIC_API_URL || '')
    setArticles(fetchedArticles)
  })

  const handleDelete = async (id: string) => {
    setLoading(true)
    // TODO: 記事の削除処理を実装
    setLoading(false)
  }

  return (
    <>
      <div className={'flex text-2xl justify-center'}>
        <div className={'p-4'}>
          <Link href={'/admin/articles/create'}>
            <Button content='Create an article'></Button>
          </Link>
        </div>
        <div className={'p-4'}>
          <Button content='Go back' handleClick={() => router.back()}></Button>
        </div>
      </div>
      <div className={'text-center'}>
        <BlogList articles={articles} from={'admin/articles'} />
      </div>
    </>
  )
}

export default AdminArticlesPage
