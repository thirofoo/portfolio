import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { checkAuth } from '@/lib/auth'
import { Article } from '@/Interfaces/Article'
import { Tag } from '@/Interfaces/Tag'
import { NextPage } from 'next'
import styles from '@/pages/admin/articles/[slug].module.css'
import { parseCookies } from 'nookies'
import { Button } from '@/components/atoms/Button'
import { getOneArticle } from '@/lib/api/article'

type Props = {
  article: Article
}

const EditArticlePage: NextPage<Props> = ({ article }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')

  const fetchData = async () => {
    const res = await checkAuth()
    if (!res.ok) {
      router.push('/login')
    } else {
      const pathname = window.location.pathname
      const slug = pathname.split('/').pop()
      console.log(slug)
      const article = await getOneArticle(slug || '', process.env.NEXT_PUBLIC_API_URL || '')
      if (!article) {
        router.push('/admin/articles')
      }
      setTitle(article.title)
      setSlug(article.slug)
      setDescription(article.description)
      setContent(article.body)
      setAuthor(article.author)
      setType(article.type)
      setThumbnail(article.thumbnail)
      const newTags = article.Tags.map((tag: Tag) => tag.name)
      setTags(newTags)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddTag = () => {
    setTags([...tags, ''])
  }

  // タグを削除
  const handleRemoveTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  // タグの入力値を更新
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  // 記事の更新処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const cookies = parseCookies()
      const token = cookies.token
      console.log(token)
      console.log('Yeah')

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/article/update/${article.ID}`,
        {
          method: 'PUT', // 更新の場合はPUTメソッドを使用する
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ヘッダーにトークンを追加
          },
          body: JSON.stringify({
            title: title,
            slug: slug,
            description: description,
            body: content,
            author: author,
            thumbnail: thumbnail,
            type: type,
            tags: tags,
          }),
        },
      )

      if (response.ok) {
        // 記事編集に成功した場合の処理を書く
        console.log('記事の編集に成功しました')
      } else {
        throw new Error('記事の編集に失敗しました')
      }
    } catch (error) {
      console.error(error)
      // エラー処理を書く
    }
    setLoading(false)
    router.push('/admin/articles')
  }

  return (
    <>
      <div className={styles['form-container']}>
        <div className='flex m-4'>
          <h1 className={styles.title}>Edit Article</h1>
          <Button content='Go back' handleClick={() => router.back()}></Button>
        </div>

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
            <label htmlFor='title' className={styles.label}>
              Tags:
            </label>
            {tags.map((tag, index) => (
              <div key={index} className={'inline-block px-4'}>
                <input
                  type='text'
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className={'mr-4 rounded-xl shadow-sh1 shadow'}
                />
                {/* 新しい関数オブジェクト生成時はアロー関数 */}
                <button onClick={() => handleRemoveTag(index)} className={styles.button}>
                  remove
                </button>
              </div>
            ))}
            {/* ただし、↓をアロー関数にすると、それを属性に持つ要素が全部レンダリングされて performance↓ */}
            {/* ちなみに handleAddTag はあくまでも関数objectの為、() => handleAddTag とすると発火されず何も起きない。 */}
            {/* 発火したい場合は、() => ~() or onClickに関数objectを入れる */}
            <button onClick={handleAddTag} className={styles.button}>
              +
            </button>
          </div>
          <div className={styles['form-group']}>
            <label htmlFor='description' className={styles.label}>
              Description:
            </label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor='author' className={styles.label}>
              Author:
            </label>
            <input
              type='text'
              id='author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor='type' className={styles.label}>
              Type:
            </label>
            <input
              type='text'
              id='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor='thumbnail' className={styles.label}>
              Thumbnail:
            </label>
            <input
              type='text'
              id='thumbnail'
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className={styles.input}
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
    </>
  )
}

export default EditArticlePage
