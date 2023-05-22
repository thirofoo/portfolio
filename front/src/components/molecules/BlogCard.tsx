import Link from 'next/link'
import { Article } from '@/Interfaces/Article'
import styles from '@/components/molecules/BlogCard.module.css'

type BlogProps = {
  article: Article
  from: string
}

export const BlogCard = ({ article, from }: BlogProps) => {
  return (
    <>
      <div className={styles.card}>
        <Link href={`/${from}/${article.slug}`}>
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

            <div className={'flex justify-between'}>
              <p className={styles['card-readmore']}>Read more &rarr;</p>
              <div className={styles['card-at']}>
                Created : {article.CreatedAt.substring(0, 10)} <br />
                Updated : {article.UpdatedAt.substring(0, 10)}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
