import styles from '@/components/molecules/Headings.module.css';
import React from 'react';

type HeadingItem = {
  element: Element;
  level: number;
};

type Props = {
  headings: HeadingItem[];
  handleHeadingClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, text: string) => void;
};

export const Headings = ({ headings, handleHeadingClick }: Props) => {
  return (
    <div className={styles.headings}>
      <ul>
        {headings.map(({ element, level }, index) => (
          <li key={index} className={styles.link} style={{ paddingLeft: `${(level - 2) * 20}px` }}>
            <a
              href={`#${element.textContent?.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={(e) => handleHeadingClick(e, element.textContent as string)}
            >
              {element.textContent}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
