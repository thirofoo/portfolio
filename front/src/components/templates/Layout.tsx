import { ReactNode } from 'react'
import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'
// import styles from './Layout.module.css'

type Props = {
  children?: ReactNode
}

export const Layout = ({ children }: Props) => {
  // body要素の全体的な構造の定義
  return (
    <>
      <div className={'min-h-screen relative pb-40 box-border'}>
        <Header />
        <div className={'pt-[120px] px-20'}>{children}</div>
        <Footer />
      </div>
    </>
  )
}
