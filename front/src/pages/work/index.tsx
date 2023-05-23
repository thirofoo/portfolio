import type { NextPage } from 'next'
import styles from '@/pages/work/work.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Link href='/work/competitive-programming'>
        <div className={styles.wrapper}>
          <div>
            <h2>My Competitive Programming Library</h2>
            <p>自分の競技プログラミングで使用するライブラリをまとめています。</p>
            <p className={styles.readmore}>Read more &rarr;</p>
          </div>
          <img
            className={styles.image}
            src='https://res.cloudinary.com/dq8pi3jes/image/upload/v1684482420/portfolio/AtCoder_ll26rt'
          />
        </div>
      </Link>
    </>
  )
}

export default Home
