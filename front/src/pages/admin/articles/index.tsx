import { useState, useEffect } from 'react'
import { checkAuth } from '@/lib/auth'
import { Article } from '@/Interfaces/Article'
import { getAllArticles } from '@/lib/api/article'
import { BlogList } from '@/components/molecules/BlogList'
import { Button } from '@/components/atoms/Button'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AdminArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await checkAuth()
      if (!res.ok) {
        router.push('/login')
      } else {
        const fetchedArticles = await getAllArticles(process.env.NEXT_PUBLIC_API_URL || '')
        setArticles(fetchedArticles)
      }
    }

    fetchData()
  }, [])

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
