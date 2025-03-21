import { CardList } from '@/components/molecules/CardList'
import { Article } from '@/Interfaces/Article'
import { getUrl } from '@/lib/url'
import styles from '@/pages/work/work.module.css'
import type { NextPage } from 'next'

const works: Article[] = [
  {
    ID: '1',
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
    DeletedAt: '',
    title: 'Algorithm Library',
    slug: 'competitive-programming',
    description: '競技プログラミング用のライブラリ一覧',
    author: 'Admin',
    thumbnail: getUrl('atcoder-logo'),
    Tags: [
      {
        ID: '1',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
        DeletedAt: '',
        name: 'Library',
      },
    ],
    type: 'work',
    body: 'This is the body content of Competitive Programming Library.',
  },
  {
    ID: '2',
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
    DeletedAt: '',
    title: 'Tetris Project',
    slug: 'https://github.com/seihirochi/tetris-project',
    description: '深層強化学習でテトリスの AI を作成',
    author: 'Admin',
    thumbnail:
      'https://res.cloudinary.com/dq8pi3jes/image/upload/v1714576433/portfolio/tetris-rl/Extra.gif',
    Tags: [
      {
        ID: '2',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
        DeletedAt: '',
        name: 'RL',
      },
    ],
    type: 'work',
    body: 'This is the body content of Tetris Project.',
  },
]

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>Works</h1>
      <div className={styles.list_wrapper}>
        <CardList articles={works} from="work" />
      </div>
    </>
  )
}

export default Home
