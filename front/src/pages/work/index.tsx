import { getUrl } from '@/lib/url'
import styles from '@/pages/work/work.module.css'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>Works</h1>
      <Link href='/work/competitive-programming'>
        <div className={styles.wrapper} id='blog-card'>
          <div className='p-4'>
            <h2>My Competitive Programming Library</h2>
            <p>自分の競技プログラミングで使用するライブラリをまとめています。</p>
            <p className={styles.readmore}>Read more &rarr;</p>
          </div>
          <Image
            className={styles.image}
            src={getUrl('/AtCoder_pyl1be')}
            alt='AtCoder'
            width={200}
            height={150}
            priority
          />
        </div>
      </Link>
    </>
  )
}

export default Home
