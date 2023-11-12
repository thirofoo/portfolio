import { Article } from '@/Interfaces/Article'
import styles from '@/components/molecules/Card.module.css'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  article: Article
  from: string
}

export const Card = ({ article, from }: Props) => {
  return (
    <>
      <div className={styles.card}>
        <Link href={`/${from}/${article.slug}`} className='rounded-xl'>
          <Image
            className={styles.image}
            src={article.thumbnail}
            alt={article.slug}
            width={10000} // 親要素内でmaxにしたいから大きい値を入れておく
            height={100}
          />
          <div className={styles.content}>
            <div>
              <div className='flex justify-between'>
                <h2 className={styles.title}>{article.title}</h2>
              </div>
              <div className='flex justify-between mb-4'>
                <p className={styles.description}>{article.description}</p>
                <div className={styles.tags}>
                  {article.Tags.map((tag) => (
                    <span key={tag.ID} className={styles.tag}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={'flex justify-between'}>
              <p className={styles.readmore}>Read more &rarr;</p>
              <div className={styles.at}>{article.CreatedAt.substring(0, 10)}</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
