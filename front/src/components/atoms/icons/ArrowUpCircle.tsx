export const ArrowUpCircle = ({ width = 32, height = 32, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12 16V8M12 8L15.5 11.5M12 8L8.5 11.5'
        stroke='#000000'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></path>
      <path
        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
        stroke='#000000'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></path>
    </svg>
  )
}
