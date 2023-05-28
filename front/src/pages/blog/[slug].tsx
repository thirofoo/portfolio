import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Article } from '@/Interfaces/Article'
import { getAllArticles, getOneArticle } from '@/lib/api/article'
import { markdownToHtml } from '@/lib/markdown'
import Image from 'next/image'
import styles from '@/pages/blog/[slug].module.css'

type BlogProps = {
  article: Article
}

const BlogDetail: NextPage<BlogProps> = ({ article }) => {
  // h2 ~ のタグ情報
  const [headings, setHeadings] = useState<Element[]>([])

  useEffect(() => {
    const fetchHeadings = () => {
      const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      setHeadings(headings)
    }

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
            width={10000} // 親要素内でmaxにしたいから大きい値を入れておく
            height={200}
          />
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.detail}>
            Created: {article.CreatedAt.substring(0, 10)} <br />
            Updated: {article.UpdatedAt.substring(0, 10)}
          </div>
        </div>
      </div>

      <div className='flex'>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.body }}></div>
    
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

  const body = await markdownToHtml(article.body, article.slug)
  article.body = body

  return {
    props: {
      article,
    },
    revalidate: 1,
  }
}
