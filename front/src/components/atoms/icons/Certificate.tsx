interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export const Certificate = ({ width = 20, height = 20, className }: Props) => (
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
    <path d="M7 2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3.3l-1.2 3l-1.2-3H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
    <path d="M9 7h6" />
    <path d="M9 11h4" />
  </svg>
);
