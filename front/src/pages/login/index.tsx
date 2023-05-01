import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '@/pages/about.module.css'

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.top_wrapper}>
          <Image
            src='/images/top.jpg'
            alt='through / thirofoo'
            width={160}
            height={160}
            className={styles.icon}
            loading='eager'
          />
          <div className={styles.top_profile}>
            <h2>thirofoo / through</h2>
            <p>Saitama University ICS B3</p>
            <p>from Tochigi</p>
          </div>
        </div>
      </div>

      <div className={'block'}>
        <div className={styles.sub_wrapper}>
          <div className={styles.profile}>
            <h3>趣味</h3>
            <p>競技プログラミング</p>
          </div>
        </div>

        <div className={styles.sub_wrapper}>
          <div className={styles.profile}>
            <h3>Skill</h3>
            <p>東京都</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
