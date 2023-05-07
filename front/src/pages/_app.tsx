import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AppLayout } from '@/components/templates/AppLayout'
import { AdminLayout } from '@/components/templates/AdminLayout'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  // layoutで定義された構造に対して、内容を組み込む
  // → _document.tsxの<Main>に組み込まれる
  const router = useRouter()
  if (router.pathname.startsWith('/admin')) {
    return (
      <AppLayout>
        <Head>
          <title>thirofoo portfolio</title>
        </Head>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <Head>
        <title>thirofoo portfolio</title>
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  )
}
export default MyApp
