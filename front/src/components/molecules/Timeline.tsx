import { ChainLink } from '@/components/atoms/icons/ChainLink';
import { Image } from '@/components/atoms/Image';
import styles from '@/components/molecules/Timeline.module.css';
import { TimelineItem } from '@/Interfaces/Timeline';
import { isValidElement, ReactNode } from 'react';

interface TimelineProps {
  data: TimelineItem[];
}

const hasRenderableContent = (node: ReactNode): boolean => {
  if (node === null || node === undefined || node === false) return false;
  if (typeof node === 'string') return node.trim().length > 0;
  if (typeof node === 'number') return true;
  if (Array.isArray(node)) return node.some(hasRenderableContent);
  if (isValidElement(node)) return hasRenderableContent(node.props.children);
  return true;
};

export const Timeline = ({ data }: TimelineProps) => {
  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        const hasDescription = hasRenderableContent(item.description);

        return (
          <div key={index}>
            <div className={styles.timelineItem}>
              <div className={styles.dateIconContainer}>

                <div className={`${styles.date} ${styles.dateDesktop}`}>
                  {item.to === '' ? null : <span>{item.to}</span>}
                  {item.from === '' ? null :
                    <>
                      <span>~</span>
                      <span>{item.from}</span>
                    </>
                  }
                </div>

                <div className={styles.iconWrapper}>
                  <Image className={styles.icon} src={item.icon} alt="" />
                  {index < data.length - 1 && <div className={styles.dottedLine}></div>}
                </div>
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-1">
                      {item.title}{' '}
                      <span className={styles.linkIcon}>
                        <ChainLink />
                      </span>
                    </a>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </h3>

                <div className={`${styles.date} ${styles.dateMobile}`}>
                  {item.from === '' ? null :
                    <>
                      <span>{item.from}</span>
                      <span>~</span>
                    </>
                  }
                  {item.to === '' ? null : <span>{item.to}</span>}
                </div>

                {hasDescription && (
                  <div className={styles.description}>{item.description}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}
