import { Image } from '@/components/atoms/Image'
import styles from '@/components/organisms/ArticleView.module.css'
import { parseHTMLToReactJSX } from '@/lib/markdown'
import { getUrl } from '@/lib/url'

type Props = {
  title: string
  bodyHtml: string
  thumbnail: string
  createdAt?: string
  updatedAt?: string
}

const formatDate = (value?: string) => {
  if (!value) return '----'
  return value.substring(0, 10)
}

export const ArticlePreview = ({
  title,
  bodyHtml,
  thumbnail,
  createdAt,
  updatedAt,
}: Props) => {
  const safeTitle = title.trim() || 'Untitled'
  const safeThumbnail = thumbnail.trim() || getUrl('white_nvvrt4')

  return (
    <div>
      <div className={styles.head_info}>
        <Image className={styles.head_image} src={safeThumbnail} alt={safeTitle} width={10000} height={200} />
        <div className={styles.title_wrapper}>
          <h1 className={styles.title}>{safeTitle}</h1>
          <div className="flex justify-between items-center">
            <div className={styles.detail}>
              Created: {formatDate(createdAt)} <br />
              Updated: {formatDate(updatedAt)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>{parseHTMLToReactJSX(bodyHtml)}</div>
    </div>
  )
}
