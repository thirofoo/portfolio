import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '@/components/templates/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  // layoutで定義された構造に対して、内容を組み込む
  // → _document.tsxの<Main>に組み込まれる
  return (
    <Layout>
      <Head>
        <title>thirofoo portfolio</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
