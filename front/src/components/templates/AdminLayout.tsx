import styles from '@/components/templates/AdminLayout.module.css'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const AdminLayout = ({ children }: Props) => {
  const router = useRouter()
  const isLoading = useCheckAuth(() => {
    return
  }, router)

  if (isLoading) {
    // ローディング表示などを行う
    return <div className="text-center text-xl">Loading...</div>
  }
  
  return (
    <>
      <div>
        <div className={styles['admin-header']}>
          <h1 className={styles['admin-header__title']}>----- This is Admin Page !!! -----</h1>
        </div>
        {children}
      </div>
    </>
  )
}
