import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { checkAuth } from '@/lib/auth'
import { Article } from '@/Interfaces/Article'
import { GetServerSidePropsContext } from 'next'
import { NextPage } from 'next'
import styles from '@/pages/admin/articles/[slug].module.css'

type Props = {
  article: Article
}

const EditArticlePage: NextPage<Props> = ({ article }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(article.title)
  const [content, setContent] = useState(article.body)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // TODO: 記事の編集処理を実装

    setLoading(false)
  }

  useEffect(() => {
    if (!article.ID) {
      router.push('/admin/articles')
    }
  }, [article.ID, router])

  if (!article.ID) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles['form-container']}>
      <h1 className={styles.title}>Edit Article</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['form-group']}>
          <label htmlFor='title' className={styles.label}>
            Title:
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor='content' className={styles.label}>
            Content:
          </label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <button type='submit' className={styles.button}>
          Submit
        </button>
      </form>
    </div>
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
  const slug = context.params?.slug
  console.log(slug)
  const article = await fetch(process.env.API_URL + `/article/get/${slug}`).then((res) =>
    res.json(),
  )
  return {
    props: {
      article,
    },
  }
}

export default EditArticlePage
