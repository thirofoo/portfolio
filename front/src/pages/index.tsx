import { Image } from '@/components/atoms/Image'
import styles from '@/pages/about.module.css'
import type { NextPage } from 'next'

import { GitHub } from '@/components/atoms/icons/GitHub'
import { X } from '@/components/atoms/icons/X'

import { LinkCard } from '@/components/molecules/LinkCard'
import { Timeline } from '@/components/molecules/Timeline'

import { TimelineItem } from '@/Interfaces/Timeline'

const timelineData: TimelineItem[] = [
  {
    from: '',
    to: '2024年12月',
    icon: '/images/ICPC.webp',
    title: <span> The 2024 ICPC Asia Yokohama Regional Contest 出場 </span>,
    description: (
      <>
        チーム executive is deprived として、2024 年 7 月に開催された国際大学対抗プログラミングコンテスト (ICPC) の国内予選で上位 10 % 入賞 + 予選通過を果たし、2024 年 12 月に開催されるアジア地区の本戦に出場することになりました。
        <div className="my-3">
          <LinkCard
            url='https://tech.preferred.jp/ja/blog/i24-gd02-qpe-result/'
            img='/images/ICPC.webp'
            title='ICPC 2024 国内予選 結果 / Results | ICPC 2024 Asia Yokohama Regional'
            description=''
            icon='/images/ICPC.webp'
          />
        </div>
      </>
    ),
  },
  {
    from: '2024年8月',
    to: '2024年9月',
    icon: '/images/preferred.webp',
    title: <span>株式会社 Preferred Networks</span>,
    description: (
      <>
        夏季インターンとして 1 カ月間 MP-PAWRという最新の天気に関するデータを用いて、CNN で天候を予測するタスクに携わりました。
        <br />
        <div className="my-3">
          <LinkCard
            url='https://tech.preferred.jp/ja/blog/i24-gd02-qpe-result/'
            img='/images/pfn_tech.webp'
            title='最新の気象レーダーを用いて降水量を推定するデータ分析コンペを開催しました - Preferred Networks Research & Development'
            description='2024年夏季インターンシッププログラムでは「４週間グループ開発コース」を新たに設け、8月26日 (月) から9月20日 (金) までの４週間にわたってグループ開発インターンシップを実施しました。本稿では「GD02 データサイエンス」のテーマで実施した、最新気象レーダー「MP-PAWR」の観測データを用いた降水量予測の取り組みについてご紹介します'
            icon='/images/preferred.webp'
          />
        </div>
      </>
    ),
  },
  {
    from: '',
    to: '2024年3月',
    icon: '/images/academics.webp',
    title: <span>東京大学松尾研究室主催 Spring Seminar 2024 深層強化学習 修了</span>,
    description: (
      <></>
    ),
  },
  {
    from: '2023年8月',
    to: '2024年8月',
    icon: '/images/future_img.webp',
    title: <span>フューチャーアーキテクト株式会社</span>,
    description: (
      <>
        夏季インターンとして 1 ヶ月間、GoのプロジェクトでTerraformやAWSのLamda、S3等を用いて、実際にある100万台以上のIoTプラットフォームの開発に携わらせていただきました。
        <br />
        インターン終了後も継続で 1 年弱の間同じプロジェクトにて開発アルバイトをしていました。
        <div className="my-3">
          <LinkCard
            url='https://future-architect.github.io/articles/20230920a/'
            img='/images/future_tech.webp'
            title='Summer Enginner Camp 2023 参加記 | フューチャー技術ブログ'
            description='私は今回、「Goとサーバレスアーキテクチャで体験。100万台超えの大規模スマートセンサーloTプラットフォームに関わってみませんか？」というプロジェクトに参加させていただきました。'
            icon='/images/future_img.webp'
          />
        </div>
      </>
    ),
  },
  {
    from: '2023年4月',
    to: '2024年3月',
    icon: '/images/maximum_img.webp',
    title: <span>埼玉大学プログラミングサークル Maximum 副会長</span>,
    description: (
      <>
        2023 年度に埼玉大学プログラミングサークル Maximum 副会長をし、競技プログラミングの講師として活動していました。
        <br />
        <div className="my-3">
          <LinkCard
            url='https://www.maximum.vc/'
            img='/images/maximum_img.webp'
            title='Maximum'
            description='埼玉大学プログラミングサークル「Maximum」の公式サイトです、活動内容や知見を情報発信していきます。'
            icon='/images/melin.png'
          />
        </div>
      </>
    ),
  },
  {
    from: '',
    to: '2022年12月',
    icon: '/images/academics.webp',
    title: <span>応用情報技術者試験 合格</span>,
    description: (
      <></>
    ),
  },
]

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
            <h3>Data Science</h3>
            <div>
              インターンにてデータサイエンスの面白さに気づき kaggle を開始 <br />
              今後色々なコンペに参加予定 <br />
              <br />
            </div>
            <LinkCard
              title='through | Novice'
              url='https://www.kaggle.com/through'
              img='/images/kaggle_img.webp'
              description=''
              icon='/images/kaggle.ico'
            />
          </div>
        </div>

        <div className={styles.timeline_wrapper}>
          <h3 className="mt-16 mb-8 text-2xl">Timeline</h3>
          <Timeline data={timelineData} />
        </div>
      </div>
    </>
  )
}

export default Home
