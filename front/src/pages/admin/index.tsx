import { Button } from '@/components/atoms/Button'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import styles from '@/pages/admin/admin.module.css'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AdminPage: NextPage = () => {
  const router = useRouter()
  useCheckAuth(() => {
    return
  }, router)

  return (
    <>
      <div className={styles.wrapper}>
        <Link href='admin/articles'>
          <Button content='View Articles' type='button'></Button>
        </Link>
      </div>
      <div className={styles.wrapper}>
        <Link href='admin/libraries'>
          <Button content='View Libraries' type='button'></Button>
        </Link>
      </div>
      <div className={styles.wrapper}>
        <Link href='admin/create'>
          <Button content='Create Article or Library' type='button'></Button>
        </Link>
      </div>
    </>
  )
}

export default AdminPage
