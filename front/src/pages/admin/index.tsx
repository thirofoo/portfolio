import type { NextPage } from 'next'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { checkAuth } from '@/lib/auth'

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
      <div>
        <Link href='admin/articles'>
          <Button content='View Articles'></Button>
        </Link>
      </div>
    </>
  )
}

export default AdminPage
