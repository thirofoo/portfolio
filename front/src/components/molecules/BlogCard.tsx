import Link from 'next/link'
import { Article } from '@/Interfaces/Article'
import styles from '@/components/molecules/BlogCard.module.css'

type BlogProps = {
  article: Article
  from: string
}

export const BlogCard = ({ article, from }: BlogProps) => {
  return (
    <Link href={`/${from}/${article.slug}`}>
      <div className={styles.card}>
        <img className={styles['card-image']} src={article.thumbnail} />
        <div className={styles['card-content']}>
          <h2 className={styles['card-title']}>{article.title}</h2>
          <p className={styles['card-description']}>{article.description}</p>

          {/* tagを個々に追加 */}
          <div className={styles['card-tags']}>
            {article.Tags.map((tag) => (
              <span key={tag.ID} className={styles['card-tag']}>
                {tag.name}
              </span>
            ))}
          </div>

          <p className={styles['card-readmore']}>Read more &rarr;</p>
        </div>
      </div>
    </Link>
  )
}
