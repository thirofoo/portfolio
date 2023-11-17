import styles from '@/pages/about.module.css'
import { GitHub, Twitter } from 'iconoir-react'
import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <div className='text-center'>
        <div className='inline-flex flex-col border-y-sh1 border-y-[1px] border-opacity-70 w-[min(80vw,768px)]'>
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
              <p>
                2002.7.24 <br></br> from Tochigi
              </p>
              <p className={styles.icon_wrapper}>
                <a
                  href='https://github.com/thirofoo'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mr-4'
                >
                  <GitHub />
                </a>
                <a
                  href='https://twitter.com/through__TH__'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mr-4'
                >
                  <Twitter />
                </a>
              </p>
            </div>
          </div>
          <div className='pb-8'>
            Saitama University ICS B3<br></br>
            競プロが好きな人。web系もほんのりやってます。
          </div>
        </div>
        <div className={styles.sub_wrapper}>
          <div className={styles.detail}>
            <div className={styles.profile}>
              <h3>Competitive Programming</h3>
              <div>
                2021/12 ~ 競技プログラミング Start<br></br>
                現在(2023/11/17) AtCoder では<br></br>
                algorithm分野は 水色 (上位5.7%)<br></br>
                heuristic分野は 青色 (上位5.1%)<br></br>
                <br></br>
                <a href='https://atcoder.jp/users/through' className='underline'>
                  AtCoder: through
                </a>
                <br></br>
                <a href='https://codeforces.com/profile/through' className='underline'>
                  Codeforces: through
                </a>{' '}
                <br></br>
              </div>
            </div>
          </div>
          <div className={styles.add_margin}></div>
          <div className={styles.detail}>
            <div className={styles.profile}>
              <h3>Web</h3>
              <div>
                2021/04/01 ~ Web開発 Start<br></br>
                大学入学後に tetris を作ったのが事の始まり<br></br>
                このサイトを作ったり、開発バイトをしたりしている。<br></br>
                <br></br>
                using language：<br></br>TypeScript, Golang <br></br>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sub_wrapper}>
          <div className={styles.detail}>
            <div className={styles.profile}>
              <h3>Others</h3>
              <div>
                <div>・応用情報技術者 (2022年度秋季)</div>
                <div>・埼玉大学プログラミングサークル Maximum 2023年度副会長</div>
              </div>
            </div>
          </div>
        </div>{' '}
      </div>
    </>
  )
}

export default Home
