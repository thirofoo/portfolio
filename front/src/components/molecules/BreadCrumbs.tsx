// Breadcrumbsコンポーネント
import styles from '@/components/molecules/BreadCrumbs.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const BreadCrumbs = () => {
  const router = useRouter()
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '') // 空のセグメントを除外

  return (
    <>
      <nav>
        <ul className={styles.breadcrumbs}>
          {pathSegments.map((segment, index) => (
            <li key={index}>
              <Link
                href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                className={index === pathSegments.length - 1 ? styles.active : ''}
              >
                {segment}
              </Link>
              {index < pathSegments.length - 1 && <span>{'>'}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
