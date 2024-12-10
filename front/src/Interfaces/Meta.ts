export interface MetaInfo {
  title: string;
  description: string;
  ogImage: string;
  ogType?: 'website' | 'article';
  ogUrl?: string;
  twitterCardType?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}
