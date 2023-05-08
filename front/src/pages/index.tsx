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

      <div className={styles.sub_wrapper}>
        <div className={styles.detail}>
          <div className={styles.profile}>
            <h3>Competitive Programming</h3>
            <div>2021年12月~競技プログラミングをしています。</div>
            <div>
              AtCoder: <a href='https://atcoder.jp/users/through'>through</a>
            </div>
            <div>
              Codeforces: <a href='https://codeforces.com/profile/through'>through</a>
            </div>
          </div>
        </div>

        <div className={styles.add_margin}></div>

        <div className={styles.detail + ' bg-gradient-to-l from-bg2 to-bg1'}>
          <div className={styles.profile}>
            <h3>Skill</h3>
            <div>used language：C, C++, TypeScript, Golang</div>
            <div>qualification：応用情報技術者</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
