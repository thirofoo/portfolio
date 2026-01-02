import { ChainLink } from '@/components/atoms/icons/ChainLink';
import { Image } from '@/components/atoms/Image';
import styles from '@/components/molecules/Timeline.module.css';
import { TimelineItem } from '@/Interfaces/Timeline';

interface TimelineProps {
  data: TimelineItem[];
}

export const Timeline = ({ data }: TimelineProps) => {
  return (
    <div className={styles.container}>
      {data.map((item, index) => (
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
              <h3 className={`${styles.title} ${item.link ? 'underline' : ''}`}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}{' '}
                    <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
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

              <div className={styles.description}>{item.description}</div>
            </div>
          </div>
        </div>

      ))}
    </div>
  )
}
