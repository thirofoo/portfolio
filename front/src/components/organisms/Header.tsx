import { Button } from '@/components/atoms/Button'
import { ChangeThemeToggle } from '@/components/atoms/ChangeThemeToggle'
import styles from '@/components/organisms/Header.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BreadCrumbs } from '../molecules/BreadCrumbs'

export const Header = () => {
  const [homeOn, setHomeOn] = useState(true)
  const [worksOn, setWorksOn] = useState(false)
  const [blogOn, setBlogOn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const fadeOutTriggerPosition = 200

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const worksClick = () => {
    if (!worksOn) {
      setHomeOn(false)
      setWorksOn(true)
      setBlogOn(false)
      closeMenu()
    }
  }

  const blogClick = () => {
    if (!blogOn) {
      setHomeOn(false)
      setWorksOn(false)
      setBlogOn(true)
      closeMenu()
    }
  }

  const homeClick = () => {
    if (!homeOn) {
      setHomeOn(true)
      setBlogOn(false)
      setWorksOn(false)
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
      <header
        className={`${styles.header} ${
          isMenuOpen ? 'bg-opacity-50 backdrop-blur-sm bg-bg2 dark:bg-dbg2 dark:bg-opacity-50' : ''
        }`}
      >
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
          <div className={styles.ham_menu} onClick={toggleMenu}>
            <i className={isMenuOpen ? styles.open : ''}></i>
            <i className={isMenuOpen ? styles.open : ''}></i>
            <i className={isMenuOpen ? styles.open : ''}></i>
          </div>
        </div>

        <div className={`${styles.content} ${isMenuOpen ? styles.head_open : ''}`}>
          <div className={styles.button_wrapper}>
            <ChangeThemeToggle></ChangeThemeToggle>
          </div>
          <div className={styles.button_group}>
            <div className={styles.button_wrapper}>
              <Link href='/'>
                <Button content='Home' state={homeOn} handleClick={homeClick} />
              </Link>
            </div>
            <div className={styles.button_wrapper}>
              <Link href='/work'>
                <Button content='Work' state={worksOn} handleClick={worksClick} />
              </Link>
            </div>
            <div className={styles.button_wrapper}>
              <Link href='/blog'>
                <Button content='Blog' state={blogOn} handleClick={blogClick} />
              </Link>
            </div>
          </div>
          <div className={styles.button_wrapper}>
            <BreadCrumbs></BreadCrumbs>
          </div>
        </div>
      </header>
    </>
  )
}
