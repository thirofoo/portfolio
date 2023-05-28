import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import styles from '@/components/organisms/Header.module.css'
import { ChangeThemeToggle } from '@/components/atoms/ChangeThemeToggle'

export const Header = () => {
  const [homeOn, setHomeOn] = useState<boolean>(true)
  const [worksOn, setWorksOn] = useState<boolean>(false)
  const [blogOn, setBlogOn] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

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

  return (
    <>
      <header className={`${styles.header}`}>
        <div className={styles.wrapper}>
          <Link href='/' className={styles.head_name} onClick={homeClick}>
            thirofoo
          </Link>
          <ChangeThemeToggle></ChangeThemeToggle>
        </div>

        <div className={styles.ham_menu} onClick={toggleMenu}>
          <i className={isMenuOpen ? styles.open : ''}></i>
          <i className={isMenuOpen ? styles.open : ''}></i>
          <i className={isMenuOpen ? styles.open : ''}></i>
        </div>

        <div className={`${styles.header_content} ${isMenuOpen ? styles.head_open : ''}`}>
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
      </header>
    </>
  )
}
