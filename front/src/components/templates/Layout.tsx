import { ReactNode } from 'react'
import styles from './Layout.module.css'
import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'

type Props = {
  children?: ReactNode
}

export const Layout = ({ children }: Props) => {
  // body要素の全体的な構造の定義
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={'pt-[200px]'}>{children}</div>
        <Footer />
      </div>
    </>
  )
}
