import { Image } from '@/components/atoms/Image'
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
        level: parseInt(heading.tagName.replace('H', ''), 10), // H2, H3...を数値化
      }))
      setHeadings(mappedHeadings)
    }

    if (typeof window !== 'undefined') {
      fetchHeadings()
    }
  }, [])

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, heading: Element) => {
    e.preventDefault()

    if (typeof window !== 'undefined') {
      const rect = heading.getBoundingClientRect()
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const offsetTop = rect.top + scrollTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

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
          <ul>
            {headings.map(({ element, level }, index) => (
              <li
                key={index}
                className={`my-4 text-md`}
                style={{ paddingLeft: `${(level - 2) * 20}px` }} // インデント調整
              >
                <a
                  href={`#${element.textContent?.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={(e) => handleHeadingClick(e, element)}
                >
                  {element.textContent}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default BlogDetail

// 動的routingのpathを教える関数
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

// build時にSSG
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
