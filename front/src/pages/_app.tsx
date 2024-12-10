import { Meta } from '@/components/atoms/Meta';
import { AdminLayout } from '@/components/templates/AdminLayout';
import { AppLayout } from '@/components/templates/AppLayout';
import { SITE_BASE_URL, SITE_NAME, TWITTER_SITE } from '@/config';
import { MetaInfo } from '@/Interfaces/Meta';
import { generateArticleOgp } from '@/lib/ogp_image';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import 'highlight.js/styles/base16/green-screen.css';
import 'highlight.js/styles/base16/materia.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const getMetaInfo = (): MetaInfo => {
    const cleanUrl = (slug?: string) => {
      return slug
        ? `${SITE_BASE_URL}/blog/${slug}`
        : `${SITE_BASE_URL}${router.pathname}`;
    };
  
    if (router.pathname.startsWith('/blog/') && pageProps.article) {
      const { article } = pageProps;
      return {
        title: article.title + ' | ' + SITE_NAME,
        description: article.description,
        ogImage: generateArticleOgp(article.title),
        ogType: 'article',
        ogUrl: cleanUrl(article.slug), // `article.slug`を利用
        canonicalUrl: cleanUrl(article.slug),
        twitterSite: TWITTER_SITE,
        noIndex: false,
      };
    } else {
      return {
        title: SITE_NAME,
        description: 'This is thirofoo portfolio',
        ogImage: generateArticleOgp(SITE_NAME),
        ogType: 'website',
        ogUrl: cleanUrl(), // `slug`なしでクリーンなURL
        canonicalUrl: cleanUrl(),
        twitterSite: TWITTER_SITE,
        noIndex: false,
      };
    }
  };

  const metaInfo = getMetaInfo();
  const isAdmin = router.pathname.startsWith('/admin');

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Meta {...metaInfo} />
      {isAdmin ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </ThemeProvider>
  );
}

export default MyApp;
