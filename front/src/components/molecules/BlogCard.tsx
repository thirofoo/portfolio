import Link from 'next/link'
import { Article } from '@/Interfaces/Article'
import styles from '@/components/molecules/BlogCard.module.css'

type BlogProps = {
  article: Article
}

export const BlogCard = ({ article }: BlogProps) => {
  return (
    <div className={styles.card}>
      <Link href={`/blog/${article.slug}`}>
        <img className={styles['card-image']} src={article.thumbnail} />
        <div className={styles['card-content']}>
          <h2 className={styles['card-title']}>{article.title}</h2>
          <p className={styles['card-description']}>{article.description}</p>
          <p className={styles['card-type']}>{article.type}</p>
          <p className={styles['card-readmore']}>Read more &rarr;</p>
        </div>
      </Link>
    </div>
  )
}
