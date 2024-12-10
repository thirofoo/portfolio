import styles from '@/components/atoms/ShareToXButton.module.css';
import { SITE_NAME } from '@/config';
import { X } from '@/components/atoms/icons/X';

type Props = {
  title: string;
  url: string;
};

export const ShareToXButton = ({ title, url }: Props) => {
  const encodedTitle = encodeURIComponent(`${title} | ${SITE_NAME}\n`);
  const encodedUrl = encodeURIComponent(url);
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  return (
    <button
      className={styles.share_to_x_button}
      onClick={() => window.open(shareUrl, '_blank', 'noopener,noreferrer')}
    >
      <X />
    </button>
  );
};