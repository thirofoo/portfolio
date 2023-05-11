import { ReactNode } from 'react'
import styles from '@/components/templates/AdminLayout.module.css'
type Props = {
  children: ReactNode
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <div className={styles['admin-header']}>
        <h1 className={styles['admin-header__title']}>----- This is Admin Page !!! -----</h1>
      </div>
      {children}
    </div>
  )
}
