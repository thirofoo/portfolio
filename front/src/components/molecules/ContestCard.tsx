import { HeuristicContest, getThumbnailUrl, getVisualizerUrl } from '@/Interfaces/HeuristicContest'
import styles from '@/components/molecules/ContestCard.module.css'
import { getRatingColor } from '@/lib/rating'
import { getUrl } from '@/lib/url'
import NextImage from 'next/image'
import { useTheme } from 'next-themes'
import { useCallback, useRef, useState } from 'react'

type Props = {
  contest: HeuristicContest
}

export const ContestCard = ({ contest }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const { resolvedTheme } = useTheme()
  const visualizerUrl = getVisualizerUrl(contest)
  const thumbnailUrl = getThumbnailUrl(contest) || getUrl('default_vbbudj')
  const hasMedia = Boolean(contest.thumbnail || visualizerUrl)

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => undefined)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  const ratingColor = getRatingColor(
    contest.performance,
    resolvedTheme === 'dark' ? 'dark' : 'light',
  )

  return (
    <a
      href={contest.problemUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.card}
      id='blog-card'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.media}>
        <NextImage
          className={`${styles.thumbnail} ${!hasMedia ? styles.noImage : ''} ${
            isHovering && visualizerUrl ? styles.hidden : ''
          }`}
          src={thumbnailUrl}
          alt={contest.id}
          width={640}
          height={360}
          loading='lazy'
          unoptimized
        />
        {visualizerUrl && (
          <video
            ref={videoRef}
            className={`${styles.video} ${isHovering ? styles.visible : ''}`}
            src={visualizerUrl}
            muted
            loop
            playsInline
            preload='none'
          />
        )}
        {visualizerUrl && <div className={styles.videoBadge}>Video</div>}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.id}>{contest.id}</span>
          <span className={styles.date}>{contest.date}</span>
        </div>
        <h3 className={styles.title}>{contest.title}</h3>
        <div className={styles.stats}>
          {contest.rank != null && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>Rank</span>
              <span className={styles.statValue}>{contest.rank}</span>
            </div>
          )}
          {contest.extendedStanding && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>Ext</span>
              <span className={styles.statValue}>{contest.extendedStanding.extendedRank}</span>
            </div>
          )}
          {contest.performance != null && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>Perf</span>
              <span className={styles.statValue} style={{ color: ratingColor }}>
                {contest.performance}
              </span>
            </div>
          )}
          <div className={styles.stat}>
            <span className={styles.statLabel}>Duration</span>
            <span className={styles.statValue}>{contest.durationText}</span>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.tags}>
            {contest.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
            {contest.language && <span className={styles.tag}>{contest.language}</span>}
          </div>
        </div>
      </div>
    </a>
  )
}
