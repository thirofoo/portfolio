import { Image } from '@/components/atoms/Image'
import styles from '@/components/molecules/LinkCard.module.css'
import { extractSlugFromURL, getUrl } from '@/lib/url'
import Link from 'next/link'

interface LinkCardProps {
  url: string
  img: string
  title: string
  description: string
  icon?: string
}

export const LinkCard = ({ url, img, title, description, icon }: LinkCardProps) => {
  return (
    <>
      <Link
        href={url}
        className={styles.card}
        target='_blank'
        rel='noopener noreferrer'
        id='link-card'
      >
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.url} id='link-icon'>
            {icon == undefined ? null : (
              <Image className={styles.icon} src={icon} alt={title} width={20} height={20} />
            )}
            <div>{extractSlugFromURL(url)}</div>
          </div>
        </div>
        <Image
          className={styles.image + (img == getUrl('default_vbbudj') ? ' ' + styles.noImage : '')}
          src={img}
          alt={title}
          width={10000} // 親要素内でmaxにしたいから大きい値を入れておく
          height={100}
        />
      </Link>
    </>
  )
}

export default LinkCard
