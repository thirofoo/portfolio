import { FieldInfo } from '@/Interfaces/FieldInfo'
import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules/FormField'
import { ArticlePreview } from '@/components/organisms/ArticlePreview'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { fetchWithToken } from '@/lib/api/request'
import styles from '@/pages/admin/create/create.module.css'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const EditArticlePage: NextPage<void> = () => {
  const router = useRouter()
  useCheckAuth(() => {
    return
  }, router)

  const [slug, setSlug] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [previewTimestamp] = useState(() => new Date().toISOString())
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState('')

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

  useEffect(() => {
    if (!isPreviewOpen) {
      return
    }

    const controller = new AbortController()
    const previewSlug = slug.trim() || 'preview'
    const timeoutId = window.setTimeout(async () => {
      setPreviewLoading(true)
      setPreviewError('')
      try {
        const response = await fetch('/api/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ markdown: content, slug: previewSlug }),
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error('Failed to render preview')
        }
        const data = await response.json()
        if (!controller.signal.aborted) {
          setPreviewHtml(data.html ?? '')
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setPreviewError('Preview failed to render.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setPreviewLoading(false)
        }
      }
    }, 300)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [content, slug, isPreviewOpen])

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
        console.error(response)
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
          <div className='px-4'>
            <Button
              content={isPreviewOpen ? 'Hide Preview' : 'Preview'}
              handleClick={() => setIsPreviewOpen((prev) => !prev)}
              type='button'
            ></Button>
          </div>
        </div>

        {!isPreviewOpen ? (
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
                  className={'mr-4 rounded shadow-sh1 shadow'}
                />
                <Button
                  content='x'
                  handleClick={() => handleRemoveTag(index)}
                  type='button'
                  add_style='min-w-0 px-3 py-2'
                />
              </div>
            ))}
            <Button
              content='Add'
              handleClick={() => handleAddTag()}
              type='button'
              add_style='min-w-0 px-3'
            />
          </div>

          {formFields.map((field) => (
            <FormField key={field.id} {...field} />
          ))}
          <Button content='Submit' type='submit' />
        </form>
        ) : null}

        {isPreviewOpen ? (
          <div className={styles.form}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Preview</h2>
              {previewLoading ? <span className="text-sm opacity-70">Rendering...</span> : null}
            </div>
            {previewError ? (
              <div className="text-sm text-red-500">{previewError}</div>
            ) : (
              <ArticlePreview
                title={title}
                bodyHtml={previewHtml}
                thumbnail={thumbnail}
                createdAt={previewTimestamp}
                updatedAt={previewTimestamp}
              />
            )}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default EditArticlePage
