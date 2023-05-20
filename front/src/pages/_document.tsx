import { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = () => {
  // Next.jsアプリケーションの骨格的な部分
  // <NextScript>は、クライアント側で読み込まれるScript

  return (
    <>
      <Head>
        <meta name='application-name' content='thirofoo home' />
        <meta name='description' content='This is thirofoo website.' />
        <link rel='icon' href='/icon.png' />
      </Head>
      <Html lang='ja-JP'>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  )
}
export default MyDocument
