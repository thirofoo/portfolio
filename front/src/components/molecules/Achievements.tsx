import { ChainLink } from '@/components/atoms/icons/ChainLink';
import { Trophy } from '@/components/atoms/icons/Trophy';
import { Image } from '@/components/atoms/Image';
import styles from '@/components/molecules/Achievements.module.css';
import { AchievementGroup } from '@/Interfaces/Achievement';
import { isValidElement, ReactNode } from 'react';

interface AchievementsProps {
  groups: AchievementGroup[];
}

const hasRenderableContent = (node: ReactNode): boolean => {
  if (node === null || node === undefined || node === false) return false;
  if (typeof node === 'string') return node.trim().length > 0;
  if (typeof node === 'number') return true;
  if (Array.isArray(node)) return node.some(hasRenderableContent);
  if (isValidElement(node)) return hasRenderableContent(node.props.children);
  return true;
};

const iconForGroup = (label: string) => {
  const normalized = label.toLowerCase();
  if (normalized.includes('contest')) return <Trophy width={22} height={22} />;
  return null;
};

export const Achievements = ({ groups }: AchievementsProps) => {
  return (
    <div className={styles.stack}>
      {groups.map((group) => {
        const groupIcon = iconForGroup(group.label);
        const hasIcons = group.items.some((item) => item.icon);

        return (
          <section key={group.label} className={styles.group}>
            <h4 className={styles.groupTitle}>
              {groupIcon && <span className={styles.groupTitleIcon}>{groupIcon}</span>}
              {group.label}
            </h4>
            <ul className={hasIcons ? styles.entries : styles.compactEntries}>
              {group.items.map((item, index) => {
                const hasDescription = hasRenderableContent(item.description);

                return item.icon ? (
                  <li key={index} className={styles.entry}>
                    <div className={styles.iconWrapper}>
                      <Image className={styles.icon} src={item.icon} alt='' width={48} height={48} />
                    </div>
                    <div className={styles.content}>
                      <p className={styles.period}>{item.period}</p>
                      <h5 className={styles.title}>
                        {item.link ? (
                          <a href={item.link} target='_blank' rel='noopener noreferrer' className='hover:underline underline-offset-4 decoration-1'>
                            {item.title}{' '}
                            <span className={styles.linkIcon}>
                              <ChainLink />
                            </span>
                          </a>
                        ) : (
                          item.title
                        )}
                      </h5>
                      {hasDescription && (
                        <div className={styles.description}>{item.description}</div>
                      )}
                    </div>
                  </li>
                ) : (
                  <li key={index} className={styles.compactEntry}>
                    <div className={styles.compactContent}>
                      <span className={styles.compactPeriod}>{item.period}</span>
                      <h5 className={styles.compactTitle}>
                        {item.link ? (
                          <a href={item.link} target='_blank' rel='noopener noreferrer' className='hover:underline underline-offset-4 decoration-1'>
                            {item.title}{' '}
                            <span className={styles.linkIcon}>
                              <ChainLink />
                            </span>
                          </a>
                        ) : (
                          item.title
                        )}
                      </h5>
                    </div>
                    {hasDescription && (
                      <div className={styles.compactDescription}>{item.description}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
};
