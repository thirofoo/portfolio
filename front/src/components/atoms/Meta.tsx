import { MetaInfo } from '@/Interfaces/Meta';
import Head from 'next/head';

const defaultProps: Partial<MetaInfo> = {
  ogType: 'website',
  twitterCardType: 'summary_large_image',
  noIndex: false,
};

export const Meta = ({
  title,
  description,
  ogImage,
  ogType = defaultProps.ogType,
  ogUrl,
  twitterCardType = defaultProps.twitterCardType,
  twitterSite,
  noIndex = defaultProps.noIndex,
  canonicalUrl,
}: MetaInfo) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterSite && <meta name="twitter:creator" content={twitterSite} />}

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  );
};
