import { HeuristicContest, getThumbnailUrl, getVisualizerUrl } from '@/Interfaces/HeuristicContest'
import styles from '@/components/molecules/ContestDetailModal.module.css'
import { getRatingColor } from '@/lib/rating'
import { getUrl } from '@/lib/url'
import { useTheme } from 'next-themes'
import NextImage from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  contest: HeuristicContest
  onClose: () => void
}

export const ContestDetailModal = ({ contest, onClose }: Props) => {
  const { resolvedTheme } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [showVideo, setShowVideo] = useState(false)

  const visualizerUrl = getVisualizerUrl(contest)
  const thumbnailUrl = getThumbnailUrl(contest) || getUrl('default_vbbudj')
  const ratingColor = getRatingColor(
    contest.performance,
    resolvedTheme === 'dark' ? 'dark' : 'light',
  )

  const sortedEditorials = [...contest.editorials].sort((a, b) => {
    if (a.rank == null && b.rank == null) return 0
    if (a.rank == null) return 1
    if (b.rank == null) return -1
    return a.rank - b.rank
  })

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [onClose])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose],
  )

  const toggleVideo = useCallback(() => {
    if (!visualizerUrl) return
    setShowVideo((prev) => {
      const next = !prev
      if (next && videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => undefined)
      } else if (!next && videoRef.current) {
        videoRef.current.pause()
      }
      return next
    })
  }, [visualizerUrl])

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeBtn} onClick={onClose} aria-label='Close'>
          ✕
        </button>

        {/* Hero media */}
        <div className={styles.heroMedia} onClick={visualizerUrl ? toggleVideo : undefined}>
          {visualizerUrl && showVideo ? (
            <video
              ref={videoRef}
              className={styles.heroVideo}
              src={visualizerUrl}
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <NextImage
              className={styles.heroImage}
              src={thumbnailUrl}
              alt={contest.id}
              width={1280}
              height={720}
              unoptimized
            />
          )}
          {visualizerUrl && (
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 4,
                cursor: 'pointer',
                pointerEvents: 'none',
              }}
            >
              {showVideo ? '▶ Playing' : '▶ Click to play'}
            </div>
          )}
        </div>

        {/* Body */}
        <div className={styles.body}>
          <span className={styles.contestId}>{contest.id}</span>
          <h2 className={styles.contestTitle}>{contest.title}</h2>

          {/* Stats */}
          <div className={styles.statsRow}>
            {contest.rank != null && (
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Rank</span>
                <span className={styles.statItemValue}>{contest.rank}</span>
              </div>
            )}
            {contest.extendedStanding && (
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Extended</span>
                <span className={styles.statItemValue}>
                  {contest.extendedStanding.extendedRank}
                </span>
              </div>
            )}
            {contest.performance != null && (
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Performance</span>
                <span className={styles.statItemValue} style={{ color: ratingColor }}>
                  {contest.performance}
                </span>
              </div>
            )}
            <div className={styles.statItem}>
              <span className={styles.statItemLabel}>Duration</span>
              <span className={styles.statItemValue}>{contest.durationText}</span>
            </div>
          </div>

          {/* Tags */}
          <div className={styles.tagRow}>
            {contest.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
            {contest.language && <span className={styles.tag}>{contest.language}</span>}
          </div>

          {/* Links */}
          <div className={styles.linksRow}>
            <a
              href={contest.problemUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.linkBtn}
            >
              Problem
            </a>
            {contest.submissionUrl && (
              <a
                href={contest.submissionUrl}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.linkBtn}
              >
                Submission
              </a>
            )}
            {contest.extendedStanding?.url && (
              <a
                href={contest.extendedStanding.url}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.linkBtn}
              >
                Extended Standing
              </a>
            )}
          </div>

          {/* Editorials */}
          {sortedEditorials.length > 0 && (
            <div className={styles.editorialsSection}>
              <h3 className={styles.editorialsTitle}>
                Editorials & References ({sortedEditorials.length})
              </h3>
              <div className={styles.editorialList}>
                {sortedEditorials.map((ed, i) => (
                  <a
                    key={i}
                    href={ed.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.editorialItem}
                  >
                    <span className={styles.editorialRank}>
                      {ed.rank != null ? `#${ed.rank}` : ''}
                    </span>
                    <span className={styles.editorialTitle}>{ed.title}</span>
                    <span className={styles.editorialArrow}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
