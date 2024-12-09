import { AdminLayout } from '@/components/templates/AdminLayout'
import { AppLayout } from '@/components/templates/AppLayout'
import { generateArticleOgp } from '@/lib/ogp_image'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import 'highlight.js/styles/base16/green-screen.css'
import 'highlight.js/styles/base16/materia.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [router.pathname])

  // Slug を取得して、OGP画像を生成
  const { slug } = router.query
  const ogpImage = generateArticleOgp(slug ? slug.toString() : 'default')

  // layoutで定義された構造に対して、内容を組み込む
  // → _document.tsxの<Main>に組み込まれる
  return (
    // default : dark mode
    // themeProvider は local storage にthemeの情報を保存している
    // → renderingされず、style単位で切り替えが可能
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <AppLayout>
        <Head>
          <title>thirofoo portfolio</title>
          <meta key='og:image' property='og:image' content={ogpImage} />
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
