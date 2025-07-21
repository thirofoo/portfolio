import { Image } from '@/components/atoms/Image'
import styles from '@/components/molecules/LinkCard.module.css'
import { extractSlugFromURL, getUrl } from '@/lib/url'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'; // useRef をインポート
import { Helmet } from 'react-helmet'

interface LinkCardProps {
  url: string
  img: string
  title: string
  description: string
  icon?: string
  twitter_normal?: string
  twitter_dark?: string
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
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const tweetContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isTwitterCard =
    typeof twitter_normal === 'string' &&
    typeof twitter_dark === 'string' &&
    twitter_normal.length >= 10

  useEffect(() => {
    if (mounted && isTwitterCard && window.twttr?.widgets?.load) {
      window.twttr.widgets.load(tweetContainerRef.current)
    }
  }, [resolvedTheme, mounted, isTwitterCard])

  if (isTwitterCard) {
    if (!mounted) {
      return null
    }
    const twitterHtml = resolvedTheme === 'dark' ? twitter_dark : twitter_normal

    return (
      // 作成したrefをdivに割り当てる
      <div className={styles.tweet} ref={tweetContainerRef}>
        <div dangerouslySetInnerHTML={{ __html: twitterHtml }} />
        <Helmet>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
        </Helmet>
      </div>
    )
  }

  // 通常のリンクカードの表示
  return (
    <Link
      href={url}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
      id="link-card"
    >
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.urlIconContainer} id="link-icon">
          {icon == undefined ? null : (
            <Image
              className={styles.icon}
              src={icon}
              alt={title}
              width={20}
              height={20}
            />
          )}
          <div className={styles.url}>{extractSlugFromURL(url)}</div>
        </div>
      </div>
      <Image
        className={
          styles.image +
          (img == getUrl('default_vbbudj') ? ' ' + styles.noImage : '')
        }
        src={img}
        alt={title}
        width={10000}
        height={100}
      />
    </Link>
  )
}