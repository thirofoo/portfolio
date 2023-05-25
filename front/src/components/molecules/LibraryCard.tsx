import Link from 'next/link'
import { Article } from '@/Interfaces/Article'
import styles from '@/components/molecules/BlogCard.module.css'

type LibraryProps = {
  article: Article
  from: string
}

export const LibraryCard = ({ article, from }: LibraryProps) => {
  return (
    <>
      <div className={styles.card}>
        <Link href={`/${from}/${article.slug}`} className='rounded-xl'>
          <div className={styles['card-content']}>
            <div className='flex justify-between'>
              <h2 className={styles['card-title']}>{article.title}</h2>
              {/* tagを個々に追加 */}
              <div className={styles['card-tags']}>
                {article.Tags.map((tag) => (
                  <span key={tag.ID} className={styles['card-tag']}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            <div className={'flex justify-end'}>
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
