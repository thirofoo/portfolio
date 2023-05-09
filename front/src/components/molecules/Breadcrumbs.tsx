import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/components/molecules/Breadcrumbs.module.css'

type Crumb = {
  name: string
  href: string
}

type Props = {
  crumbs: Crumb[]
}

export const Breadcrumbs: React.FC<Props> = ({ crumbs }) => {
  const router = useRouter()

  return (
    <nav>
      <ul className={styles.breadcrumbs}>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            <Link href={crumb.href} className={router.asPath === crumb.href ? styles.active : ''}>
              {crumb.name}
            </Link>
            {index < crumbs.length - 1 && <span>{'>'}</span>}
          </li>
        ))}
      </ul>
    </nav>
  )
}
