import Link from "next/link"

const Header = () => {
  return(
    <header>
        <Link href='/' legacyBehavior>
            <a className={
                'text-9xl m-auto'
            }>Portfolio</a>
        </Link>
        <div>
            <Link href='/works' legacyBehavior>
                <a className='head_item'>Works</a>
            </Link>
            <Link href='/blog' legacyBehavior>
                <a className='head_item'>Blog</a>
            </Link>
        </div>
    </header>
  )
}
export default Header