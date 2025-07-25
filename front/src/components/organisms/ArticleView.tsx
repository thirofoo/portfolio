import { CopyButton } from '@/components/atoms/CopyButton'
import { Image } from '@/components/atoms/Image'
import { ShareToXButton } from '@/components/atoms/ShareToXButton'
import { BreadCrumbs } from '@/components/molecules/BreadCrumbs'
import { Headings } from '@/components/molecules/Headings'
import styles from '@/components/organisms/ArticleView.module.css'
import { SITE_BASE_URL } from '@/config'
import { Article } from '@/Interfaces/Article'
import { parseHTMLToReactJSX } from '@/lib/markdown'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
  article: Article
}

export const ArticleView: NextPage<Props> = ({ article }) => {
  const [headings, setHeadings] = useState<{ element: Element; level: number }[]>([])

  useEffect(() => {
    const fetchHeadings = () => {
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      headingElements.forEach((heading) => {
        if (!heading.id && heading.textContent) {
          heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-')
        }
      })
      const mappedHeadings = headingElements.map((heading) => ({
        element: heading,
        level: parseInt(heading.tagName.replace('H', ''), 10),
      }))
      setHeadings(mappedHeadings)
    }

    if (typeof window !== 'undefined') {
      fetchHeadings()
    }
  }, [])

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, text: string) => {
    e.preventDefault();
    const normalizedText = text.toLowerCase().replace(/\s+/g, '-');

    const targetHeading = document.querySelector(`[id="${normalizedText}"]`);
    if (targetHeading) {
      const rect = targetHeading.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const offsetTop = rect.top + scrollTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const basePath = router.pathname.replace(/\[.*\]/, '');
  const trimmedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  return (
    <>
      <div>
        <div className={styles.head_info} id='head-info'>
          <Image
            className={styles.head_image}
            src={article.thumbnail}
            alt={article.slug}
            width={10000}
            height={200}
          />
          <div className={styles.title_wrapper}>
            <h1 className={styles.title}>{article.title}</h1>
            <div className="flex justify-between items-center">
              <div className={styles.detail}>
                Created: {article.CreatedAt.substring(0, 10)} <br />
                Updated: {article.UpdatedAt.substring(0, 10)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BreadCrumbs />

      <div className='flex'>
        <div className={styles.content}>{parseHTMLToReactJSX(article.body)}</div>

        <div className={styles.headings}>
          <div className='mb-4 flex justify-start space-x-2'>
            <ShareToXButton
              title={article.title}
              url={`${SITE_BASE_URL}${trimmedBasePath}/${article.slug}`}
            />
            <CopyButton
              url={`${SITE_BASE_URL}${trimmedBasePath}/${article.slug}`}
            />
          </div>
          <Headings
            headings={headings}
            handleHeadingClick={(e, text) => handleHeadingClick(e, text)}
          />
        </div>
      </div>
    </>
  )
}
