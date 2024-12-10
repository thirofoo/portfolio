import { Image } from '@/components/atoms/Image'
import { ShareToXButton } from '@/components/atoms/ShareToXButton'
import { Headings } from '@/components/molecules/Headings'
import { SITE_BASE_URL } from '@/config'
import { Article } from '@/Interfaces/Article'
import { getAllArticles, getOneArticle } from '@/lib/api/article'
import { markdownToHtml, parseHTMLToReactJSX } from '@/lib/markdown'
import styles from '@/pages/blog/[slug].module.css'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type BlogProps = {
  article: Article
}

const BlogDetail: NextPage<BlogProps> = ({ article }) => {
  const [headings, setHeadings] = useState<{ element: Element; level: number }[]>([])

  useEffect(() => {
    const fetchHeadings = () => {
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
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
  
    const targetHeading = document.querySelector(`[id="${text}"]`);
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

  return (
    <>
      <div>
        <div className={styles.head_info}>
          <Image
            className={styles.head_image}
            src={article.thumbnail}
            alt={article.slug}
            width={10000}
            height={200}
          />
          <div className={styles.title_wrapper}>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.detail}>
              Created: {article.CreatedAt.substring(0, 10)} <br />
              Updated: {article.UpdatedAt.substring(0, 10)}
            </div>
          </div>
        </div>
      </div>

      <div className='flex'>
        <div className={styles.content}>{parseHTMLToReactJSX(article.body)}</div>
    
        <div className={styles.headings}>
          <div className='mb-4'>
            <ShareToXButton
              title={article.title}
              url={`${SITE_BASE_URL}/blog/${article.slug}`}
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

export default BlogDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles(process.env.API_URL as string)
  if (!articles) {
    return {
      paths: [],
      fallback: true,
    }
  }
  const paths = articles.map((article: Article) => ({
    params: { slug: article.slug },
  }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  const { slug } = params as { slug: string }
  const article = await getOneArticle(slug, process.env.API_URL as string)
  if (!article) {
    return {
      notFound: true,
    }
  }

  const body: string = await markdownToHtml(article.body, article.slug)
  article.body = body

  return {
    props: {
      article,
    },
    revalidate: 1,
  }
}
