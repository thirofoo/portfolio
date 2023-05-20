import { useRouter } from 'next/router'
import { useState } from 'react'
import { Tag } from '@/Interfaces/Tag'
import { NextPage } from 'next'
import styles from '@/pages/admin/articles/[slug].module.css'
import { Button } from '@/components/atoms/Button'
import { getOneArticle } from '@/lib/api/article'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { fetchWithToken } from '@/lib/api/request'
import { FormField } from '@/components/molecules/FormField'
import { FieldInfo } from '@/Interfaces/FieldInfo'

const EditArticlePage: NextPage = () => {
  const router = useRouter()
  const [id, setId] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  // formのField情報
  const formFields: FieldInfo[] = [
    { id: 'title', label: 'Title', value: title, onChange: setTitle },
    { id: 'description', label: 'Description', value: description, onChange: setDescription },
    { id: 'content', label: 'Content', value: content, onChange: setContent, textarea: true },
    { id: 'author', label: 'Author', value: author, onChange: setAuthor },
    { id: 'type', label: 'Type', value: type, onChange: setType },
    { id: 'thumbnail', label: 'Thumbnail', value: thumbnail, onChange: setThumbnail },
  ]

  useCheckAuth(async () => {
    const pathname = window.location.pathname
    const slug = pathname.split('/').pop()
    const article = await getOneArticle(slug || '', process.env.NEXT_PUBLIC_API_URL || '')
    if (!article) {
      router.push('/admin/articles')
    }
    setId(article.ID)
    setSlug(article.slug)
    setType(article.type)
    setTitle(article.title)
    setContent(article.body)
    setAuthor(article.author)
    setThumbnail(article.thumbnail)
    setDescription(article.description)
    const newTags = article.Tags.map((tag: Tag) => tag.name)
    setTags(newTags)
  })

  const handleAddTag = () => {
    setTags([...tags, ''])
  }

  const handleRemoveTag = (index: number) => {
    // フィルタ関数を指定して、indexを除いたタグの配列を作成
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleTagChange = (index: number, value: string) => {
    setTags(tags.map((tag, i) => (i === index ? value : tag)))
  }

  // 記事の更新処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/article/update/${id}`,
        'PUT',
        {
          title: title,
          slug: slug,
          description: description,
          body: content,
          author: author,
          thumbnail: thumbnail,
          type: type,
          tags: tags,
        },
      )

      if (response.ok) {
        console.log('記事の編集に成功しました')
        router.push('/admin/articles')
      } else {
        throw new Error('記事の編集に失敗しました')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 記事の削除処理
  const handleDelete = async () => {
    // 削除確認
    const confirmDelete = window.confirm('記事を削除してもよろしいですか？')
    if (!confirmDelete) return

    try {
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/article/delete/${id}`,
        'DELETE',
        {},
      )

      if (response.ok) {
        console.log('記事の削除に成功しました')
        router.push('/admin/articles')
      } else {
        throw new Error('記事の削除に失敗しました')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={styles['form-container']}>
        <div className='flex m-4'>
          <h1 className={styles.title}>Edit Article</h1>
          <div className='px-4'>
            <Button content='Go back' handleClick={() => router.back()}></Button>
          </div>
          <div className='px-4'>
            <Button content='Delete' handleClick={() => handleDelete()}></Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles['form-group']}>
            <label htmlFor='title' className={styles.label}>
              Tags:
            </label>
            {tags.map((tag, index) => (
              <div key={index} className={'inline-block pr-8 pb-4'}>
                <input
                  type='text'
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className={'mr-4 rounded-xl shadow-sh1 shadow'}
                />
                <Button content='-' handleClick={() => handleRemoveTag(index)} />
              </div>
            ))}
            <Button content='+' handleClick={() => handleAddTag()} />
          </div>

          {/* fieldのproperty名とFormFieldのprops名が完全に一致してる */}
          {/* → スプレッド演算子 ( {...field}ってやつ ) で展開可能 */}
          {formFields.map((field) => (
            <FormField key={field.id} {...field} />
          ))}
          <Button content='Submit' type='submit' />
        </form>
      </div>
    </>
  )
}

export default EditArticlePage
