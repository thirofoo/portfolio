import { FieldInfo } from '@/Interfaces/FieldInfo'
import { Tag } from '@/Interfaces/Tag'
import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules/FormField'
import { ArticlePreview } from '@/components/organisms/ArticlePreview'
import styles from '@/components/organisms/AdminEdit.module.css'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { getOneArticle } from '@/lib/api/article'
import { fetchWithToken } from '@/lib/api/request'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
  genre: string
}

export const AdminEdit = ({ genre }: Props) => {
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
  const [createdAt, setCreatedAt] = useState<string>('')
  const [updatedAt, setUpdatedAt] = useState<string>('')
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

  useCheckAuth(async () => {
    const pathname = window.location.pathname
    const slug = pathname.split('/').pop()
    const article = await getOneArticle(slug || '', process.env.NEXT_PUBLIC_API_URL || '')
    if (!article) {
      router.push(`/admin/${genre}`)
    }
    setId(article.ID)
    setSlug(article.slug)
    setType(article.type)
    setTitle(article.title)
    setContent(article.body)
    setAuthor(article.author)
    setThumbnail(article.thumbnail)
    setDescription(article.description)
    setCreatedAt(article.CreatedAt)
    setUpdatedAt(article.UpdatedAt)
    const newTags = article.Tags.map((tag: Tag) => tag.name)
    setTags(newTags)
  }, router)

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
        console.log('編集に成功しました')
        router.push(`/admin/${genre}`)
      } else {
        throw new Error('編集に失敗しました')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 記事の削除処理
  const handleDelete = async () => {
    // 削除確認
    const confirmDelete = window.confirm('削除してもよろしいですか？')
    if (!confirmDelete) return

    try {
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/article/delete/${id}`,
        'DELETE',
        null,
      )

      if (response.ok) {
        console.log('削除に成功しました')
        router.push(`/admin/${genre}`)
      } else {
        throw new Error('削除に失敗しました')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={styles['form-container']}>
        <div className={styles.form_head}>
          <h1 className={styles.title}>Edit {genre}</h1>
          <div className={styles.head_button}>
            <div className={styles.button}>
              <Button content='Go back' handleClick={() => router.back()} type='button'></Button>
            </div>
            <div className={styles.button}>
              <Button
                content={isPreviewOpen ? 'Hide Preview' : 'Preview'}
                handleClick={() => setIsPreviewOpen((prev) => !prev)}
                type='button'
              ></Button>
            </div>
            <div className={styles.button}>
              <Button content='Delete' handleClick={() => handleDelete()} type='button'></Button>
            </div>
          </div>
        </div>

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
                createdAt={createdAt}
                updatedAt={updatedAt}
              />
            )}
          </div>
        ) : (
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
                    className={styles.tags}
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

            {/* fieldã®propertyåã¨FormFieldã®propsåãŒå®Œå…¨ã«ä¸€è‡´ã—ã¦ã‚‹ */}
            {/* â†’ ã‚¹ãƒ—ãƒ¬ãƒƒãƒ‰æ¼”ç®—å­ ( {...field}ã£ã¦ã‚„ã¤ ) ã§å±•é–‹å¯èƒ½ */}
            {formFields.map((field) => (
              <FormField key={field.id} {...field} />
            ))}
            <Button content='Submit' type='submit' />
          </form>
        )}

      </div>
    </>
  )
}
