import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/atoms/Button'

const headerClass: string = 'flex fixed mb-5 p-5 text-4xl shadow-lg shadow-white w-full z-10'
const headItemClass: string = 'flex p-5 text-center'

const Header = () => {
  const [worksOn, setWorksOn] = useState<boolean>(false)
  const [blogOn, setBlogOn] = useState<boolean>(false)

  const worksClick = () => {
    if (!worksOn) {
      setWorksOn(!worksOn)
      setBlogOn(false)
    }
  }
  const blogClick = () => {
    if (!blogOn) {
      setBlogOn(!blogOn)
      setWorksOn(false)
    }
  }

  return (
    <>
      <header className={headerClass}>
        <Link href='/' legacyBehavior>
          <a
            className={'text-7xl m-auto'}
            onClick={() => {
              setWorksOn(false)
              setBlogOn(false)
            }}
          >
            Portfolio
          </a>
        </Link>

        <div className={'flex'}>
          <Link href='/works' legacyBehavior>
            <div className={headItemClass}>
              <Button content='Works' state={worksOn} handleClick={worksClick}></Button>
            </div>
          </Link>

          <Link href='/blog' legacyBehavior>
            <div className={headItemClass}>
              <Button content='Blog' state={blogOn} handleClick={blogClick}></Button>
            </div>
          </Link>
        </div>
      </header>
    </>
  )
}
export default Header
