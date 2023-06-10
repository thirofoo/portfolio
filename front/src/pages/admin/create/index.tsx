import { FieldInfo } from '@/Interfaces/FieldInfo'
import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules/FormField'
import { fetchWithToken } from '@/lib/api/request'
import styles from '@/pages/admin/create/create.module.css'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

const EditArticlePage: NextPage<void> = () => {
  const router = useRouter()
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
    { id: 'slug', label: 'Slug', value: slug, onChange: setSlug },
    { id: 'thumbnail', label: 'Thumbnail', value: thumbnail, onChange: setThumbnail },
  ]

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

  // 記事の作成処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (type !== 'blog' && type !== 'library') {
      alert('Typeはblogかlibraryを指定してください')
      return
    }
    if (slug === 'blog' || slug === 'library') {
      alert('Slugはblogとlibraryは指定できません')
      return
    }

    try {
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/article/create`,
        'POST',
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
        console.log('作成に成功しました')
        router.push('/admin')
      } else {
        throw new Error('作成に失敗しました')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={styles['form-container']}>
        <div className='flex m-4'>
          <h1 className={styles.title}>Create Article or Library</h1>
          <div className='px-4'>
            <Button
              content='Go back'
              handleClick={() => router.push('/admin')}
              type='button'
            ></Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
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
                <Button content='-' handleClick={() => handleRemoveTag(index)} type='button' />
              </div>
            ))}
            <Button content='+' handleClick={() => handleAddTag()} type='button' />
          </div>

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
