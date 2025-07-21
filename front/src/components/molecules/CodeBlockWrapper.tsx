import { useRef, useState } from 'react';
import styles from './CodeBlockWrapper.module.css';

const CopyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
  >
    <path
      d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="8"
      y="8"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.icon} ${styles.checkIcon}`}
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CodeBlockWrapper = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const textToCopy = preRef.current?.innerText;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={handleCopy}
          className={styles.copyButton}
          aria-label="Copy code to clipboard"
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
          <span className={styles.copyButtonText}>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre
        ref={preRef}
        {...props}
        className={`${props.className} ${styles.preOverrides}`}
      >
        {props.children}
      </pre>
    </div>
  );
};