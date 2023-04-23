import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Button from '../components/atoms/Button'
import Blog from '@/components/molecules/Blog'

type Article = {
  ID: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  title: string
  slug: string
  description: string
  author: string
  thumbnail: string
  Tags: {
    ID: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
    name: string
  }[]
  type: string
  body: string
}

const Home: NextPage = () => {
  const [articles, setArticle] = useState<Article[]>([])
  useEffect(() => {
    const fetcharticle = async () => {
      const response = await fetch('http://localhost:3000/api/article')
      const data = await response.json()
      setArticle(data)
    }
    fetcharticle()
  }, [])

  return (
    <>
      <div className={'text-center text-4xl p-10'}>
        {articles.map((article) => (
          <Blog blog={article} />
        ))}
        <div className={'m-20 flex justify-center'}>
          <Button content='More'></Button>
        </div>
      </div>
    </>
  )
}

export default Home
