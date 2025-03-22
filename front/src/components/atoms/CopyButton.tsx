import styles from '@/components/atoms/CopyButton.module.css';
import { Check } from '@/components/atoms/icons/Check';
import { Clip } from '@/components/atoms/icons/Clip';
import { useState } from 'react';

type Props = {
  url: string;
};

export const CopyButton = ({ url }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      console.log('URL copied to clipboard');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button className={styles.copy_button} onClick={handleCopy}>
      {copied ? <Check /> : <Clip />}
    </button>
  );
};