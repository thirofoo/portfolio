import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AppLayout } from '@/components/templates/AppLayout'
import { AdminLayout } from '@/components/templates/AdminLayout'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // layoutで定義された構造に対して、内容を組み込む
  // → _document.tsxの<Main>に組み込まれる
  return (
    // default : light mode
    // themeProvider は local storage にthemeの情報を保存している
    // → renderingされず、style単位で切り替えが可能
    <ThemeProvider attribute='class' defaultTheme='light'>
      <AppLayout>
        <Head>
          <title>thirofoo portfolio</title>
        </Head>
        {router.pathname.startsWith('/admin') ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </AppLayout>
    </ThemeProvider>
  )
}

export default MyApp
