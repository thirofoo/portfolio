import styles from '@/components/atoms/ScrollToTopButton.module.css'
import { ArrowUpCircle } from '@/components/atoms/icons/ArrowUpCircle'
import { useEffect, useState } from 'react'

export const ScrollToTopButton = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const fadeOutTriggerPosition = 200 // フェードアウトを開始するスクロール位置

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    // スクロールイベントを追加
    window.addEventListener('scroll', handleScroll)

    // コンポーネントがアンマウントされた時にイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`${styles.scroll_to_top_button} ${
        scrollPosition >= fadeOutTriggerPosition ? styles.fade_in : styles.fade_out + ' hidden'
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpCircle />
    </button>
  )
}
