export const Clip = ({ width = 32, height = 32, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="3"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}
