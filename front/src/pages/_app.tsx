import { Meta } from '@/components/atoms/Meta';
import { WaveBackground } from '@/components/atoms/WaveBackground';
import { AdminLayout } from '@/components/templates/AdminLayout';
import { AppLayout } from '@/components/templates/AppLayout';
import { SITE_BASE_URL, SITE_NAME, TWITTER_SITE } from '@/config';
import { MetaInfo } from '@/Interfaces/Meta';
import { generateArticleOgp } from '@/lib/ogp_image';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import 'katex/dist/katex.min.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// import 'highlight.js/styles/base16/green-screen.css';
// import 'highlight.js/styles/base16/materia.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const cubeSize = isMobile ? 52 : 78;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const getMetaInfo = (): MetaInfo => {
    const cleanUrl = (slug?: string) => {
      const basePath = router.pathname.replace(/\[.*\]/, '');
      const trimmedBasePath = basePath.endsWith('/')
        ? basePath.slice(0, -1)
        : basePath;
      return slug
        ? `${SITE_BASE_URL}${trimmedBasePath}/${slug}`
        : `${SITE_BASE_URL}${trimmedBasePath}`;
    };

    if (pageProps.article) {
      const { article } = pageProps;
      return {
        title: article.title + ' | ' + SITE_NAME,
        description: article.description,
        ogImage: generateArticleOgp(article.title),
        ogType: 'article',
        ogUrl: cleanUrl(article.slug),
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
        ogUrl: cleanUrl(),
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
      <WaveBackground cubeSize={cubeSize} />
      <AppLayout>
        <Meta {...metaInfo} />
        {isAdmin ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </AppLayout>
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;