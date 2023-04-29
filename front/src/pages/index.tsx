import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div>
      <h1 className={'text-center text-4xl'}>This is My home page !</h1>
      <Image
        src='/images/top.jpg'
        alt='through / thirofoo'
        width={160}
        height={160}
        loading='eager'
      />
    </div>
  )
}

export default Home
