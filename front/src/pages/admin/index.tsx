import type { NextPage } from 'next'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import styles from '@/pages/admin/admin.module.css'
import { useCheckAuth } from '@/hooks/useCheckAuth'

const AdminPage: NextPage = () => {
  useCheckAuth(() => {
    return
  })
  return (
    <>
      <div className={styles.wrapper}>
        <Link href='admin/articles'>
          <Button content='View Articles' type='button'></Button>
        </Link>
      </div>
    </>
  )
}

export default AdminPage
