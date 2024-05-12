import { ScrollToTopButton } from '@/components/atoms/ScrollToTopButton'
import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'
import styles from '@/components/templates/AppLayout.module.css'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const AppLayout = ({ children }: Props) => {
  // body要素の全体的な構造の定義
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.child}>{children}</div>
        <ScrollToTopButton />
        <Footer />
      </div>
    </>
  )
}
