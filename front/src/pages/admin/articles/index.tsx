import { useState, useEffect } from 'react'
import { checkAuth } from '@/lib/auth'
import { Article } from '@/Interfaces/Article'
import { getAllArticles } from '@/lib/api/article'
import { BlogList } from '@/components/molecules/BlogList'
import { Button } from '@/components/atoms/Button'
import { useRouter } from 'next/router'

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
      <div className={'text-center'}>
        <BlogList articles={articles} from={'admin/articles'} />
      </div>
      <div className={'m-20 flex justify-center'}>
        <Button content='More'></Button>
      </div>
    </>
  )
}

export default AdminArticlesPage
