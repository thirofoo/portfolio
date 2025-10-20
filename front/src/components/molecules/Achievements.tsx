import { ChainLink } from '@/components/atoms/icons/ChainLink';
import { Certificate } from '@/components/atoms/icons/Certificate';
import { Presentation } from '@/components/atoms/icons/Presentation';
import { Trophy } from '@/components/atoms/icons/Trophy';
import { Image } from '@/components/atoms/Image';
import styles from '@/components/molecules/Achievements.module.css';
import { AchievementGroup } from '@/Interfaces/Achievement';

interface AchievementsProps {
  groups: AchievementGroup[];
}

const iconForGroup = (label: string) => {
  const normalized = label.toLowerCase();
  if (normalized.includes('contest')) return <Trophy width={22} height={22} />;
  if (normalized.includes('publication') || normalized.includes('conference')) {
    return <Presentation width={22} height={22} />;
  }
  if (normalized.includes('qualification') || normalized.includes('cert')) {
    return <Certificate width={22} height={22} />;
  }
  return null;
};

export const Achievements = ({ groups }: AchievementsProps) => {
  return (
    <div className={styles.stack}>
      {groups.map((group) => {
        const groupIcon = iconForGroup(group.label);

        return (
          <section key={group.label} className={styles.group}>
            <h4 className={styles.groupTitle}>
              {groupIcon && <span className={styles.groupTitleIcon}>{groupIcon}</span>}
              {group.label}
            </h4>
            <ul className={styles.entries}>
              {group.items.map((item, index) => (
                <li key={index} className={styles.entry}>
                  <div className={styles.iconWrapper}>
                    <Image className={styles.icon} src={item.icon} alt='' width={48} height={48} />
                  </div>
                  <div className={styles.content}>
                    <p className={styles.period}>{item.period}</p>
                    <h5 className={`${styles.title} ${item.link ? 'underline' : ''}`}>
                      {item.link ? (
                        <a href={item.link} target='_blank' rel='noopener noreferrer'>
                          {item.title}{' '}
                          <span className={styles.linkIcon}>
                            <ChainLink />
                          </span>
                        </a>
                      ) : (
                        item.title
                      )}
                    </h5>
                    <div className={styles.description}>{item.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};
