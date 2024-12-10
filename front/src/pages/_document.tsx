import { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html lang="ja-JP">
      <Head>
        <meta name="application-name" content="thirofoo home" />
        <link rel="icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content="thirofoo home" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
