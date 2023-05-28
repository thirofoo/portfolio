import React from 'react'
import styles from '@/components/molecules/Headings.module.css'

type Props = {
  headings: Element[]
  handleHeadingClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, text: string) => void
}

export const Headings = ({ headings, handleHeadingClick }: Props) => {
  return (
    <>
      <div className={styles.headings}>
        <ul>
          {headings.map((heading, index) => (
            <li key={index} className={styles.link}>
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
    </>
  )
}
