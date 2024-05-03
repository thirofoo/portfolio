import { Image } from '@/components/atoms/Image'
import { getUrl } from '@/lib/url'
import styles from '@/pages/work/work.module.css'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>Works</h1>
      <Link href='/work/competitive-programming'>
        <div className={styles.wrapper} id='blog-card'>
          <div className='p-4'>
            <h2>Competitive Programming Library</h2>
            <p>競技プログラミングで使用するライブラリのまとめ</p>
            <p className={styles.readmore}>Read more &rarr;</p>
          </div>
          <Image
            className={styles.image}
            src={getUrl('atcoder-logo')}
            alt='AtCoder'
            width={200}
            height={150}
          />
        </div>
      </Link>

      <Link href='https://github.com/seihirochi/tetris-project' target='_blank'>
        <div className={styles.wrapper} id='blog-card'>
          <div className='p-4'>
            <h2>Tetris Project</h2>
            <p>深層強化学習でテトリスの AI を作成</p>
            <p className={styles.readmore}>Read more &rarr;</p>
          </div>
          <Image
            className={styles.image}
            src={
              'https://res.cloudinary.com/dq8pi3jes/image/upload/v1714576433/portfolio/tetris-rl/Extra.gif'
            }
            alt='AtCoder'
            width={200}
            height={150}
          />
        </div>
      </Link>
    </>
  )
}

export default Home
