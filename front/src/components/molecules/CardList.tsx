import { Article, createEmptyArticle } from '@/Interfaces/Article'
import { Card } from '@/components/molecules/Card'
import styles from '@/components/molecules/CardList.module.css'

type CardListProps = {
  articles: Article[]
  from: string
}

export const CardList = ({ articles, from }: CardListProps) => {
  const pairedArticles: any[] = []

  // 2記事ずつ見て card を並べていく
  for (let i = 0; i < articles.length; i += 2) {
    const firstArticle = articles[i]
    const secondArticle = i + 1 < articles.length ? articles[i + 1] : null

    pairedArticles.push(
      <div key={firstArticle.ID} className={styles.article_wrapper}>
        <div className={styles.card}>
          <Card article={firstArticle} from={from} />
        </div>
        {secondArticle ? (
          <div className={styles.card}>
            <Card article={secondArticle} from={from} />
          </div>
        ) : (
          // dummy article を opacity-0 で表示させておく
          <div className={styles.card + ' opacity-0 pointer-events-none'}>
            <Card article={createEmptyArticle()} from={from} />
          </div>
        )}
      </div>,
    )
  }

  return <div className={styles.container}>{pairedArticles}</div>
}
