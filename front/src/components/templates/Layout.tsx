import { ReactNode } from 'react'
import { Header } from '@/components/organisms/Header'

type Props = {
  children?: ReactNode
}

export const Layout = ({ children }: Props) => {
  // body要素の全体的な構造の定義
  return (
    <>
      <Header />
      <div className={'pt-[200px]'}>{children}</div>
      <footer>
        <p>2023/4 through</p>
      </footer>
    </>
  )
}
