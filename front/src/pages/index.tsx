import { Image } from '@/components/atoms/Image'
import styles from '@/pages/about.module.css'
import type { NextPage } from 'next'

import { GitHub } from '@/components/atoms/icons/GitHub'
import { X } from '@/components/atoms/icons/X'
import { Zenn } from '@/components/atoms/icons/Zenn'


import { Achievements } from '@/components/molecules/Achievements'
import { Timeline } from '@/components/molecules/Timeline'

import { AchievementGroup } from '@/Interfaces/Achievement'
import { TimelineItem } from '@/Interfaces/Timeline'

const timelineData: TimelineItem[] = [
  {
    from: '2025年7月',
    to: '',
    icon: '/images/algo_artis.webp',
    title: <span>株式会社 ALGO ARTIS アルゴリズムエンジニア アルバイト</span>,
    description: (
      <>
        主にヒューリスティック最適化の技術を用いて、様々な社会基盤に関わる業界におけるスケジューリングなどの最適化問題に取り組んでいます。<br />
        現在もなお、大学での研究と並行してアルバイトとして勤務しています。
      </>
    ),
    link: 'https://www.algo-artis.com/',
  },
  {
    from: '2025年9月',
    to: '2025年10月',
    icon: '/images/recruit.webp',
    title: <span>株式会社リクルート Data Specialists 2025 夏季インターン</span>,
    description: (
      <>
        5 週間、ML エンジニアとして、リコメンド改善のタスクに取り組みました。<br />
        BigQuery を用いて大量のデータを処理し、特徴量エンジニアリングやモデル構築を行い、精度改善に貢献しました。
      </>
    ),
    link: 'https://www.recruit.co.jp/employment/students/internship/dsintern/',
  },
  {
    from: '2025年4月',
    to: '',
    icon: '/images/academics.webp',
    title: <span>埼玉大学大学院理工学研究科 入学</span>,
    description: (
      <></>
    ),
  },
  {
    from: '2024年8月',
    to: '2024年9月',
    icon: '/images/preferred.webp',
    title: <span>株式会社 Preferred Networks 夏季インターン</span>,
    description: (
      <>
        1 カ月間、MP-PAWR という最新の天気に関するデータを用いて、CNN を用いて天候を予測するタスクに携わらせていただきました。<br />
        <span className="mt-2 block text-sm">
          詳しい振り返りは{' '}
          <a href="https://tech.preferred.jp/ja/blog/i24-gd02-qpe-result/" target="_blank" rel="noopener noreferrer" className={styles.accent_link}>
            ブログ記事
          </a>{' '}
          で紹介しています。
        </span>
      </>
    ),
    link: 'https://www.preferred.jp/ja/',
  },
  {
    from: '',
    to: '2024年3月',
    icon: '/images/academics.webp',
    title: <span>東京大学松尾研究室主催 Spring Seminar 2024 深層強化学習 修了</span>,
    description: (
      <>
        深層強化学習について学び、自由課題として Tetris のゲーム AI エージェントの作成に取り組みました。<br />
        <span className="mt-2 block text-sm">
          内容の詳細は{' '}
          <a href="https://thirofoo.com/blog/tetris-rl" rel="noopener noreferrer" className={styles.accent_link}>
            ブログ記事
          </a>{' '}
          でまとめています。
        </span>
      </>
    ),
  },
  {
    from: '2023年8月',
    to: '2024年8月',
    icon: '/images/future_img.webp',
    title: <span>フューチャーアーキテクト株式会社 夏季インターン ・ アルバイト</span>,
    description: (
      <>
        1 ヶ月間、GoのプロジェクトでTerraformやAWSのLamda、S3等を用いて、IoTプラットフォームの開発に携わらせていただきました。インターン終了後も継続で 1 年弱の間同じプロジェクトにて開発アルバイトをしていました。<br />
        <span className="mt-2 block text-sm">
          当時の様子は{' '}
          <a href="https://future-architect.github.io/articles/20230920a/" target="_blank" rel="noopener noreferrer" className={styles.accent_link}>
            ブログ記事
          </a>{' '}
          で紹介しています。
        </span>
      </>
    ),
    link: 'https://www.future.co.jp/architect/',
  },
  {
    from: '2023年4月',
    to: '2024年3月',
    icon: '/images/maximum_img.webp',
    title: <span>埼玉大学プログラミングサークル Maximum 副会長</span>,
    description: (
      <>
        2023 年度に埼玉大学プログラミングサークル Maximum 副会長をし、競技プログラミングの講師として活動していました。<br />
        また、サークル主催のコンテスト
        <a href="https://saitama-maximum.connpass.com/event/287949/" target="_blank" rel="noopener noreferrer" className={styles.accent_link}>
          「Maximum-Cup 2023」
        </a>
        、
        <a href="https://saitama-maximum.connpass.com/event/325174/" target="_blank" rel="noopener noreferrer" className={styles.accent_link}>
          「Maximum-Cup 2024」
        </a>
        の運営にも携わりました。
      </>
    ),
    link: 'https://www.maximum.vc/',
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

const achievementGroups: AchievementGroup[] = [
  {
    label: 'Contest',
    items: [
      {
        period: '2025年12月',
        icon: '/images/ICPC.webp',
        title: <span> The 2025 ICPC Asia Yokohama Regional Contest 出場 </span>,
        description: (
          <>
            チーム Maximum Masters として、2025 年 7 月に開催された国際大学対抗プログラミングコンテスト (ICPC) の国内予選で 40 位 / 352 位で予選通過を果たし、2025 年 12 月に開催されるアジア地区の本戦に出場しました。
            <a
              href="https://icpc.jp/2025/domestic/results/#:~:text=40-,Maximum%20Masters,-%E2%98%86%20Saitama%20University"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accent_link}
            >
              (Prelim Results)
            </a>
          </>
        ),
        link: 'https://icpc.jp/2025/',
      },
      {
        period: '2025年8月',
        icon: '/images/track-logo.webp',
        title: <span> AIコンペ2025｜人間かAIか？コードの書き手を見抜け！| 2 位入賞 </span>,
        description: (
          <>
            人間とAIが書いたソースコードを識別する二値分類タスクのAIコンペティションで 2 位入賞を果たし、賞金 10 万円を獲得しました。
          </>
        ),
        link: 'https://job.tracks.run/lp/ai-competition-2025',
      },
      {
        period: '2025年2月',
        icon: '/images/kaggle.webp',
        title: <span> Santa 2024 - The Perplexity Permutation Puzzle | Silver Medal</span>,
        description: (
          <>
            kaggle で開催された Perplexity を指標に、単語がシャッフルされた文章を並べ替える組み合わせ最適化系 NLP コンペティションで 31 位 / 1515 位で Silver Medal を獲得しました。
            <a
              href="https://www.kaggle.com/certification/competitions/through/santa-2024"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accent_link}
            >
              (Certification)
            </a>
          </>
        ),
        link: 'https://www.kaggle.com/competitions/santa-2024',
      },
      {
        period: '2024年12月',
        icon: '/images/ICPC.webp',
        title: <span> The 2024 ICPC Asia Yokohama Regional Contest 出場 </span>,
        description: (
          <>
            チーム executive is deprived として、2024 年 7 月に開催された国際大学対抗プログラミングコンテスト (ICPC) の国内予選で上位 10 % 入賞 + 予選通過を果たし、2024 年 12 月に開催されるアジア地区の本戦に出場しました。
            <a
              href="https://icpc.jp/2024/domestic/results/#:~:text=executive%20is%20deprived"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accent_link}
            >
              (Prelim Results)
            </a>
            <br />
            アジア地区本選では 47 位 / 55 位となり、悔しい結果となりましたが、貴重な経験となりました。
            {' '}
            <a
              href="https://storage.googleapis.com/files.icpc.jp/regional2024/standings.html#:~:text=executive%20is%20deprived"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accent_link}
            >
              (Regional Results)
            </a>
          </>
        ),
        link: 'https://icpc.jp/2024/',
      },
    ],
  },
  {
    label: 'Publication / Conference',
    items: [
      {
        period: '2025年11月',
        icon: '/images/academics.webp',
        title: <span>APRIS 2025 Best Paper Award 受賞</span>,
        description: (
          <>
            Asia Pacific Conference on Robot IoT System Development and Platform (APRIS 2025) に参加し、口頭発表に参加しました。
            <br />
            また学会で発表された論文のうち、最も評価の高かった論文の著者に対して贈られる
            <div className="inline-block font-bold mx-1">
              Best Paper Award
            </div>
            を受賞しました。
          </>
        ),
        link: 'http://www.sigemb.jp/APRIS/2025/wordpress/',
      },
      {
        period: '2025年3月',
        icon: '/images/academics.webp',
        title: <span> 第252回ARC・第208回SLDM・第68回EMB合同研究発表会（ETNET2025）参加 </span>,
        description: (
          <>
            情報処理学会 (IPSJ) 主催の ETNET2025 に参加し、口頭発表とポスターセッションに参加しました。
          </>
        ),
        link: 'https://www.ipsj.or.jp/kenkyukai/event/arc252sldm208emb68.html',
      },
    ],
  },
  {
    label: 'Qualification',
    items: [
      {
        period: '2022年12月',
        icon: '/images/academics.webp',
        title: <span>応用情報技術者試験 合格</span>,
        description: (
          <></>
        ),
      },
      {
        period: '2020年8月',
        icon: '/images/academics.webp',
        title: <span>実用数学技能検定 準1級 合格</span>,
        description: (
          <></>
        ),
      },
    ],
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
              width={120}
              height={120}
              priority
              sizes="(max-width: 768px) 40vw, 120px"
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
                  aria-label='GitHub'
                  className={styles.icon}
                >
                  <GitHub />
                </a>

                <a
                  href='https://twitter.com/through__TH__'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='X (Twitter)'
                  className={styles.icon}
                >
                  <X />
                </a>

                <a
                  href='https://zenn.dev/through'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Zenn'
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
          <div className="mx-auto text-left max-w-3xl">
            <p>
              メタヒューリスティクスや数理最適化、機械学習などを駆使した効率的な問題解決に取り組むことが好きで、競技プログラミングやデータサイエンスを嗜んでいます。
              <a href="https://atcoder.jp/users/through" className={styles.accent_link} target="_blank" rel="noopener noreferrer">
                AtCoder
              </a>
              では Algorithm は青色 (上位4.3%)、Heuristic は黄色 (上位4.2%) を、
              <a href="https://www.kaggle.com/through" className={styles.accent_link} target="_blank" rel="noopener noreferrer">
                Kaggle
              </a>
              では Competitions Expert を達成しています。
              <br />
              <span className="mt-2 block" />

              また Web 開発にも触れており、Next.js と Go を用いてこのサイトを自作しています。
              <br />
              <span className="mt-2 block" />

              大学では自動運転に関する研究室に所属し、確率を用いた応答時間解析に関する研究をしています。
              <br />
            </p>
          </div>
        </div>

        <div className={styles.timeline_wrapper}>
          <h3 className="mb-8 text-2xl">Experience</h3>
          <Timeline data={timelineData} />
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-2xl">Achievements</h3>
          <Achievements groups={achievementGroups} />
        </div>
      </div>
    </>
  )
}

export default Home
