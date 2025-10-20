interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export const Presentation = ({ width = 20, height = 20, className }: Props) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="12" rx="2" />
    <path d="M12 15v6" />
    <path d="M8 21h8" />
    <path d="M7 7h10M7 11h6" />
  </svg>
);
