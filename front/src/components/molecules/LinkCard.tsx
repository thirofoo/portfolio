import { Image } from '@/components/atoms/Image'
import styles from '@/components/molecules/LinkCard.module.css'
import Link from 'next/link'

interface LinkCardProps {
  url: string
  img: string
  title: string
  description: string
}

export const LinkCard = ({ url, img, title, description }: LinkCardProps) => {
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
        </div>
        <Image
          className={styles.image}
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
