import type { NextPage } from 'next'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { checkAuth } from '@/lib/auth'
import styles from '@/pages/admin/admin.module.css'

const AdminPage: NextPage = () => {
  const router = useRouter()

  const checkAuthentication = async () => {
    const res = await checkAuth()
    if (!res.ok) {
      router.push('/login')
    }
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        <Link href='admin/articles'>
          <Button content='View Articles'></Button>
        </Link>
      </div>
      {/* <div className={styles.wrapper}>
        <Link href='admin/users'>
          <Button content='View Users'></Button>
        </Link>
      </div> */}
    </>
  )
}

export default AdminPage
