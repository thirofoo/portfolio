import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import styles from '@/components/organisms/Header.module.css'

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
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <Link href='/' className={styles.head_name} onClick={homeClick}>
            thirofoo
          </Link>
          <div className={`${styles.ham_menu}`} onClick={toggleMenu}>
            <span className={isMenuOpen ? styles.open : ''}></span>
            <span className={isMenuOpen ? styles.open : ''}></span>
            <span className={isMenuOpen ? styles.open : ''}></span>
          </div>
          <div>light toggle</div>
        </div>

        <div className={`${styles.header_content} ${isMenuOpen ? styles.head_open : ''}`}>
          <div className='m-4'>
            <Link href='/'>
              <Button content='Home' state={homeOn} handleClick={homeClick} />
            </Link>
          </div>
          <div className='m-4'>
            <Link href='/work'>
              <Button content='Work' state={worksOn} handleClick={worksClick} />
            </Link>
          </div>
          <div className='m-4'>
            <Link href='/blog'>
              <Button content='Blog' state={blogOn} handleClick={blogClick} />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
