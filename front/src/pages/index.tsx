import styles from '@/pages/about.module.css'
import { GitHub, Twitter } from 'iconoir-react'
import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <div className='text-center'>
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
              <p>
                2002.7.24 <br></br> from Tochigi
              </p>
              <p className='flex my-4'>
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
        </div>

        <div className={styles.sub_wrapper}>
          <div className={styles.detail}>
            <div className={styles.profile}>
              <h3>About Me</h3>
              <div>
                栃木出身 埼玉大学情報工学科3年<br></br>
                大学入学後に tetris を作成したのがプログラミングの始まり
                <br></br>
                <br></br>
                thirofoo や through という名前で活動していて、現在は競プロやweb等にハマり中。
              </div>
            </div>
          </div>

          <div className={styles.add_margin}></div>

          <div className={styles.detail}>
            <div className={styles.profile}>
              <h3>Competitive Programming</h3>
              <div>
                2021/12 ~ 競技プログラミング開始<br></br>
                現在(2023/05/13) AtCoder では<br></br>
                algorithm分野が水色(上位5.7%)<br></br>
                heuristic分野は青色(上位5.1%)<br></br>
                <br></br>
                <a href='https://atcoder.jp/users/through'>AtCoder: through</a> <br></br>
                <a href='https://codeforces.com/profile/through'>Codeforces: through</a> <br></br>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sub_wrapper}>
          <div className={styles.detail}>
            <div className={styles.profile}>
              <h3>Skill</h3>
              <div>
                programming language：<br></br>C, C++, TypeScript, Golang <br></br>
                <br></br>qualification：<br></br>応用情報技術者 (2022年度秋季)
              </div>
            </div>
          </div>

          <div className={styles.add_margin}></div>

          <div className={styles.detail}>
            <div className={styles.profile}>
              <h3>Others</h3>
              <div>・埼玉大学プログラミングサークル Maximum 2023年度副会長。</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
