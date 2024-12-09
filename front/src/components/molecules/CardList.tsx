import { Article, createEmptyArticle } from '@/Interfaces/Article'
import { Card } from '@/components/molecules/Card'
import styles from '@/components/molecules/CardList.module.css'

type CardListProps = {
  articles: Article[]
  from: string
}

export const CardList = ({ articles, from }: CardListProps) => {
  return (
    <table className={styles.table}>
      <tbody>
        {articles.reduce((rows, article, index) => {
          if (index % 2 === 0) {
            const secondArticle = index + 1 < articles.length ? articles[index + 1] : null
            rows.push(
              <tr key={index} className={styles.row}>
                <td className={styles.cell}>
                  <Card article={article} from={from}/>
                </td>
                <td className={styles.cell}>
                  {secondArticle ? (
                    <Card article={secondArticle} from={from} />
                  ) : (
                    <div className={styles.dummy}>
                      <Card article={createEmptyArticle()} from={from} />
                    </div>
                  )}
                </td>
              </tr>
            )
          }
          return rows
        }, [] as JSX.Element[])}
      </tbody>
    </table>
  )
}
