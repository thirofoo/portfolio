import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import styles from '@/components/organisms/Header.module.css'

export const Header = () => {
  const [homeOn, setHomeOn] = useState<boolean>(true)
  const [worksOn, setWorksOn] = useState<boolean>(false)
  const [blogOn, setBlogOn] = useState<boolean>(false)

  const worksClick = () => {
    if (!worksOn) {
      setHomeOn(false)
      setWorksOn(true)
      setBlogOn(false)
    }
  }
  const blogClick = () => {
    if (!blogOn) {
      setHomeOn(false)
      setWorksOn(false)
      setBlogOn(true)
    }
  }
  const homeClick = () => {
    if (!homeOn) {
      setHomeOn(true)
      setBlogOn(false)
      setWorksOn(false)
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header-container']}>
          <div className='m-5 rounded-full'>
            <Link href='/'>
              <Button content='Home' state={homeOn} handleClick={homeClick}></Button>
            </Link>
          </div>

          <div className='m-5 rounded-full'>
            <Link href='/works'>
              <Button content='Works' state={worksOn} handleClick={worksClick}></Button>
            </Link>
          </div>

          <div className='m-5 rounded-full'>
            <Link href='/blog'>
              <Button content='Blog' state={blogOn} handleClick={blogClick}></Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
