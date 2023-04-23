import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/atoms/Button'

const headerClass: string = 'flex fixed text-3xl shadow-lg shadow-white w-full z-10 justify-center'

const Header = () => {
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
      <header className={headerClass}>
        <div className={'flex'}>
          <Link href='/' legacyBehavior>
            <div className='m-5 rounded-full'>
              <Button content='Home' state={homeOn} handleClick={homeClick}></Button>
            </div>
          </Link>

          <Link href='/works' legacyBehavior>
            <div className='m-5 rounded-full'>
              <Button content='Works' state={worksOn} handleClick={worksClick}></Button>
            </div>
          </Link>

          <Link href='/blog' legacyBehavior>
            <div className='m-5 rounded-full'>
              <Button content='Blog' state={blogOn} handleClick={blogClick}></Button>
            </div>
          </Link>
        </div>
      </header>
    </>
  )
}
export default Header
