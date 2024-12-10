import { ChangeThemeToggle } from '@/components/atoms/ChangeThemeToggle'
import styles from '@/components/organisms/Header.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SlideButton } from '../atoms/SlideButton'

export const Header = () => {
  const [homeOn, setHomeOn] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const fadeOutTriggerPosition = 200

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const homeClick = () => {
    if (!homeOn) {
      setHomeOn(true)
      closeMenu()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <Link
            href='/'
            className={`${styles.head_name} ${
              scrollPosition >= fadeOutTriggerPosition ? styles.fade_out : styles.fade_in
            }`}
            onClick={homeClick}
          >
            thirofoo
          </Link>
          <div className={styles.ham_menu} onClick={toggleMenu} id="ham-menu">
            <i className={isMenuOpen ? styles.open : ''}></i>
            <i className={isMenuOpen ? styles.open : ''}></i>
            <i className={isMenuOpen ? styles.open : ''}></i>
          </div>
        </div>

        <div className={`${styles.content} ${isMenuOpen ? styles.head_open : styles.head_close}`}>
          <div className={styles.button_wrapper}>
            <div className={styles.theme_toggle}>
              <ChangeThemeToggle></ChangeThemeToggle>
            </div>
            <SlideButton options={[
              { label: 'Home', link: '/' },
              { label: 'Work', link: '/work' },
              { label: 'Blog', link: '/blog' },
            ]}
            />
          </div>
        </div>
      </header>
    </>
  )
}
