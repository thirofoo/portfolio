// Breadcrumbsコンポーネント
import styles from '@/components/molecules/BreadCrumbs.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const BreadCrumbs = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');

  return (
    <>
      <nav>
        <ul className={styles.breadcrumbs}>
          {pathSegments.map((segment, index) => (
            <li key={index}>
              <Link
                href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                className={`${styles.link} ${index === pathSegments.length - 1 ? styles.active : ''
                  }`}
              >
                {segment}
              </Link>
              {index < pathSegments.length - 1 && <span>{'>'}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};