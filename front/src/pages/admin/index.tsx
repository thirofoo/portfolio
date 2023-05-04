import { GetServerSideProps } from 'next'
import { checkAuth } from '@/lib/auth'

export const getServerSideProps: GetServerSideProps = async (context) => {
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

const AdminPage = () => {
  return <div>This is Admin Site !!!</div>
}

export default AdminPage
