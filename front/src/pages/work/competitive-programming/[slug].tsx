import { Image } from '@/components/atoms/Image'
import { Article } from '@/Interfaces/Article'
import { getOneArticle } from '@/lib/api/article'
import { getAllLibraries } from '@/lib/api/library'
import { markdownToHtml, parseHTMLToReactJSX } from '@/lib/markdown'
import styles from '@/pages/work/competitive-programming/[slug].module.css'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type BlogProps = {
  article: Article
}

const BlogDetail: NextPage<BlogProps> = ({ article }) => {
  const router = useRouter()
  // h2 以上のタグ情報 (headings用)
  const [headings, setHeadings] = useState<Element[]>([])

  useEffect(() => {
    const fetchHeadings = () => {
      const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      setHeadings(headings)
    }
    // SSR時にはwindowがないので、ブラウザでのみ実行する
    if (typeof window !== 'undefined') {
      fetchHeadings()
    }
  }, [])

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, heading: string) => {
    e.preventDefault()

    if (typeof window !== 'undefined') {
      const targetHeading = headings.find((h) => h.textContent === heading)

      if (targetHeading) {
        const rect = targetHeading.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const offsetTop = rect.top + scrollTop - 100
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className={styles.head_info}>
        <Image
          className={styles.head_image}
          src={article.thumbnail}
          alt={article.slug}
          width={10000} // 親要素内でmaxにしたいから大きい値を入れておく
          height={200}
        />
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.detail}>
          Created: {article.CreatedAt.substring(0, 10)} <br />
          Updated: {article.UpdatedAt.substring(0, 10)}
        </div>
      </div>

      <div className='flex'>
        <div className={styles.content}>{parseHTMLToReactJSX(article.body)}</div>

        <div className={styles.headings}>
          <ul>
            {headings.map((heading, index) => (
              <li key={index} className='my-4 text-md'>
                <a
                  href={`#${heading.textContent?.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={(e) => handleHeadingClick(e, heading.textContent as string)}
                >
                  {heading.textContent}
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
  const articles = await getAllLibraries(process.env.API_URL as string)
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
  const body = await markdownToHtml(article.body, article.slug)
  article.body = body

  return {
    props: {
      article,
    },
    revalidate: 1,
  }
}
