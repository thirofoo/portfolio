// pages/admin/index.tsx
import { GetServerSideProps } from 'next'
import { checkAuth } from '@/lib/auth'
import type { GetServerSidePropsContext, NextPage } from 'next'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const auth = await checkAuth(context.req)

  if (!auth.ok) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const AdminPage: NextPage = () => {
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
