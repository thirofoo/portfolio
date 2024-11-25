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
                <span>{item.from}</span>
                <span>~</span>
                <span>{item.to}</span>
              </div>
              <div className={styles.iconWrapper}>
                <Image className={styles.icon} src={item.icon} alt=""/>
                {index < data.length - 1 && <div className={styles.dottedLineDesktop}></div>}
              </div>
            </div>
        
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
                <div>
                  <span className={styles.dateMobile}>{item.from} ~ {item.to}</span>
                </div>
                <div className={styles.descriptionDesktop}>{item.description}</div>
              </div>
            </div>
          <div className={styles.descriptionMobile}>{item.description}</div>
          {index < data.length - 1 && <div className={styles.dottedLineMobile}></div>}
        </div>

      ))}
    </div>
  )
}
