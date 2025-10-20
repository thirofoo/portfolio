interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export const Trophy = ({ width = 20, height = 20, className }: Props) => (
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
    <path d="M8 21h8" />
    <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z" />
    <path d="M12 14v4" />
    <path d="M5 6H3v2a4 4 0 0 0 4 4" />
    <path d="M19 6h2v2a4 4 0 0 1-4 4" />
  </svg>
);
