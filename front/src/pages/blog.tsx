import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '../components/atoms/Button'

type Article = {
  ID: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  title: string
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
          <div key={article.ID}>
            <h2>{article.title}</h2>
            <div>{article.body}</div>
          </div>
        ))}

        <Button content='More'></Button>
      </div>
    </>
  )
}

export default Home
