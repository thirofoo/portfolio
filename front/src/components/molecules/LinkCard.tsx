import { Image } from '@/components/atoms/Image'
import styles from '@/components/molecules/LinkCard.module.css'
import { extractSlugFromURL, getUrl } from '@/lib/url'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Helmet } from 'react-helmet'

interface LinkCardProps {
  url: string
  img: string
  title: string
  description: string
  icon?: string
  // Twitter Card 用
  twitter_normal?: string
  twitter_dark?: string
}

function twitterCard(light: string, dark: string, theme: string | undefined) {
  return (
    <>
      {theme === 'dark' ? (
        <div dangerouslySetInnerHTML={{ __html: dark }} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: light }} />
      )}
    </>
  )
}

export const LinkCard = ({
  url,
  img,
  title,
  description,
  icon,
  twitter_normal,
  twitter_dark,
}: LinkCardProps) => {
  const { theme } = useTheme()
  if (
    typeof twitter_normal === 'string' &&
    typeof twitter_dark === 'string' &&
    twitter_normal.length >= 10
  ) {
    // Twitter Card は別途設定
    const start_theme: string = theme === 'dark' ? 'dark' : 'light'
    return (
      <>
        <div className={styles.tweet}>
          {twitterCard(twitter_normal, twitter_dark, start_theme)}
          <Helmet>
            <script async src='https://platform.twitter.com/widgets.js' />
          </Helmet>
        </div>
      </>
    )
  }

  return (
    <>
      <Link
        href={url}
        className={styles.card}
        target='_blank'
        rel='noopener noreferrer'
        id='link-card'
      >
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.urlIconContainer} id='link-icon'>
            {icon == undefined ? null : (
              <Image className={styles.icon} src={icon} alt={title} width={20} height={20} />
            )}
            <div className={styles.url}>{extractSlugFromURL(url)}</div>
          </div>
        </div>
        <Image
          className={styles.image + (img == getUrl('default_vbbudj') ? ' ' + styles.noImage : '')}
          src={img}
          alt={title}
          width={10000} // 親要素内でmaxにしたいから大きい値を入れておく
          height={100}
        />
      </Link>
    </>
  )
}
