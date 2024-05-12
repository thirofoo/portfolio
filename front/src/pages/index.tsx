import { Image } from '@/components/atoms/Image'
import LinkCard from '@/components/molecules/LinkCard'
import styles from '@/pages/about.module.css'
import type { NextPage } from 'next'

import { GitHub } from '@/components/atoms/icons/GitHub'
import { X } from '@/components/atoms/icons/X'

const Home: NextPage = () => {
  return (
    <>
      <div className='text-center'>
        <div className={styles.top_wrapper}>
          <div className={styles.profile_wrapper}>
            <Image
              src='/images/top.webp'
              alt='through / thirofoo'
              width={160}
              height={160}
              className={styles.top_icon}
            />
            <div className={styles.top_profile}>
              <h2>thirofoo / through</h2>
              <p>2002.7.24</p>
              <h3>Saitama University ICS B4</h3>
              <p className={styles.icon_wrapper}>
                <a
                  href='https://github.com/thirofoo'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.icon}
                >
                  <GitHub />
                </a>
                <a
                  href='https://twitter.com/through__TH__'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.icon}
                >
                  <X />
                </a>
              </p>
            </div>
          </div>
          <div className={styles.description}>
            趣味でプログラミングをする大学生 <br />
            特に競技プログラミングが好きで web 関連も少し触っています <br />
          </div>
        </div>
        <div className={styles.sub_wrapper}>
          <div className={styles.profile}>
            <h3>Competitive Programming</h3>
            <div>
              2021/11/27 ~ 競技プログラミング Start <br />
              AtCoder というコンテストサイトでは <br />
              Algorithm 分野は 青色 (上位4.3%) <br />
              Heuristic 分野は 黄色 (上位4.2%) <br />
              <br />
            </div>
            <LinkCard
              title='through - AtCoder'
              url='https://atcoder.jp/users/through'
              img='/images/atcoder.webp'
              description='AtCoder is a programming contest site for anyone from beginners to experts. We hold weekly programming contests online.'
              icon='/images/atcoder_icon.png'
            />
          </div>
          <div className={styles.add_margin}></div>
          <div className={styles.profile}>
            <h3>Web</h3>
            <div>
              2021/04/01 ~ Web開発 Start <br />
              大学入学後に Tetris を作ったのがプログラミングとの出会い <br />
              このサイトを作ったり Future Inc. で開発バイトをしたりしている <br />
              <br />
            </div>
            <LinkCard
              title='フューチャー株式会社'
              url='https://www.future.co.jp/'
              img='/images/future_img.webp'
              description='フューチャー株式会社の会社概要、経営理念、CSR、投資家情報などに関する情報を掲載している、企業公式サイトです。'
              icon='/images/future.ico'
            />
          </div>
        </div>

        <div className={styles.sub_wrapper}>
          <div className={styles.profile}>
            <h3>Others</h3>
            <div className='w-full'>
              <div>・応用情報技術者 (2022年度秋季)</div>
              <div>・埼玉大学プログラミングサークル Maximum 2023年度副会長</div>
              <br />
            </div>
            <LinkCard
              url='https://www.maximum.vc/'
              img='/images/maximum_img.webp'
              title='Maximum'
              description='埼玉大学プログラミングサークル「Maximum」の公式サイトです、活動内容や知見を情報発信していきます'
              icon='/images/melin.png'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
