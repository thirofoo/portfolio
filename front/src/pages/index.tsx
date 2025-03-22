import { Image } from '@/components/atoms/Image'
import styles from '@/pages/about.module.css'
import type { NextPage } from 'next'

import { GitHub } from '@/components/atoms/icons/GitHub'
import { X } from '@/components/atoms/icons/X'
import { Zenn } from '@/components/atoms/icons/Zenn'


import { Timeline } from '@/components/molecules/Timeline'

import { TimelineItem } from '@/Interfaces/Timeline'

const timelineData: TimelineItem[] = [
  {
    from: '2025年4月',
    to: '',
    icon: '/images/academics.webp',
    title: <span>埼玉大学大学院理工学研究科数理電子情報専攻情報工学プログラム 入学</span>,
    description: (
      <></>
    ),
  },
  {
    from: '',
    to: '2025年3月',
    icon: '/images/logo_ipsj.webp',
    title: <span> 第252回ARC・第208回SLDM・第68回EMB合同研究発表会（ETNET2025）参加 </span>,
    description: (
      <>
        情報処理学会 (IPSJ) 主催の ETNET2025 に参加し、口頭発表（スライド発表）とポスターセッションに参加しました。
      </>
    ),
    link: 'https://www.ipsj.or.jp/kenkyukai/event/arc252sldm208emb68.html',
  },
  {
    from: '',
    to: '2024年12月',
    icon: '/images/ICPC.webp',
    title: <span> The 2024 ICPC Asia Yokohama Regional Contest 出場 </span>,
    description: (
      <>
        チーム executive is deprived として、2024 年 7 月に開催された国際大学対抗プログラミングコンテスト (ICPC) の国内予選で上位 10 % 入賞 + 予選通過を果たし、2024 年 12 月に開催されるアジア地区の本戦に出場しました。
      </>
    ),
    link: 'https://icpc.iisf.or.jp/2024-yokohama/domestic/icpc-2024-result/',
  },
  {
    from: '2024年8月',
    to: '2024年9月',
    icon: '/images/preferred.webp',
    title: <span>株式会社 Preferred Networks 夏季インターン</span>,
    description: (
      <>
        1 カ月間 MP-PAWR という最新の天気に関するデータを用いて、CNN を用いて天候を予測するタスクに携わらせていただきました。
      </>
    ),
    link: 'https://tech.preferred.jp/ja/blog/i24-gd02-qpe-result/',
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
    title: <span>フューチャーアーキテクト株式会社 夏季インターン ・ アルバイト</span>,
    description: (
      <>
        1 ヶ月間、GoのプロジェクトでTerraformやAWSのLamda、S3等を用いて、IoTプラットフォームの開発に携わらせていただきました。インターン終了後も継続で 1 年弱の間同じプロジェクトにて開発アルバイトをしていました。
      </>
    ),
    link: 'https://future-architect.github.io/articles/20230920a/',
  },
  {
    from: '2023年4月',
    to: '2024年3月',
    icon: '/images/maximum_img.webp',
    title: <span>埼玉大学プログラミングサークル Maximum 副会長</span>,
    description: (
      <>
        2023 年度に埼玉大学プログラミングサークル Maximum 副会長をし、競技プログラミングの講師として活動していました。
      </>
    ),
    link: 'https://www.maximum.vc/',
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
  {
    from: '2021年4月',
    to: '2025年03月',
    icon: '/images/academics.webp',
    title: <span>埼玉大学工学部情報工学科 入学</span>,
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
              <p>2002.7.24 from Tochigi, Japan</p>
              <h3>
                <a href="https://www.saitama-u.ac.jp/" className="text-font-bold underline pr-2" target="_blank" rel="noopener noreferrer" >
                  Saitama University
                </a> 
                <br />
                Graduate School of Science and Engineering
              </h3>

              {/* ICON 系統 */}
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

                <a
                  href='https://zenn.dev/through'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.icon}
                >
                  <Zenn />
                </a>

              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="mb-8 text-2xl text-center">About me</h3>
          <div className="mx-auto text-left max-w-2xl">
            <p>
              メタヒューリスティクスや数理最適化、機械学習などを駆使した効率的な問題解決に取り組むことが好きで、競技プログラミングやデータサイエンスを嗜んでいます。
              <a href="https://atcoder.jp/users/through" className="text-font-bold underline pr-2" target="_blank" rel="noopener noreferrer" >
                AtCoder
              </a>
              では Algorithm は青色 (上位4.3%)、Heuristic は黄色 (上位4.2%) を、
              <a href="https://www.kaggle.com/through" className="text-font-bold underline pr-2" target="_blank" rel="noopener noreferrer" >
                Kaggle
              </a>
              では Competitions Expert を達成しています。
              <br /><br />

              また Web 開発にも触れており、Next.js と Go を用いてこのサイトを自作しています。
              <br /><br />

              大学では自動運転に関する研究室に所属し、確率を用いた応答時間解析に関する研究をしています。
              <br />
            </p>
          </div>
        </div>

        <div className={styles.timeline_wrapper}>
          <h3 className="mb-8 text-2xl">Timeline</h3>
          <Timeline data={timelineData} />
        </div>
      </div>
    </>
  )
}

export default Home
