import { Article } from '@/Interfaces/Article'
import { Image } from '@/components/atoms/Image'
import styles from '@/components/molecules/Card.module.css'
import Link from 'next/link'

type Props = {
  article: Article
  from: string
}

export const Card = ({ article, from }: Props) => {
  return (
    <>
      <div className={styles.card} id='blog-card'>
        <Link
          href={article.slug.includes('http') ? article.slug : `/${from}/${article.slug}`}
          {...(article.slug.includes('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <Image
            className={styles.image}
            src={article.thumbnail}
            alt={article.slug}
            width={10000} // 親要素内でmaxにしたいから大きい値を入れておく
            height={100}
          />
          <div className={styles.content}>
            <div className='flex h-full flex-col justify-between z-10'>
              <h2 className={styles.title}>{article.title}</h2>
              <div className='flex justify-between mb-2'>
                <div className={styles.tags}>
                  {article.Tags.map((tag) => (
                    <span key={tag.ID} className={styles.tag}>
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className={styles.at}>{article.CreatedAt.substring(0, 10)}</div>
              </div>
              <p className={article.type == 'library' ? 'hidden' : ''}>{article.description}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
