type Props = {
  content: string
  state?: boolean
  handleClick?: () => void // props経由でhandleを操作
}

const buttonClass =
  'font-bold rounded-full py-4 px-16 shadow-lg shadow-shadow transition duration-200 ease-in-out hover:shadow-md flex items-center justify-center relative transform active:scale-95 active:shadow-inner border-t-[1px] border-shadow bg-bg-primary'
const activeButtonClass =
  'font-bold rounded-full py-4 px-16 transition duration-200 ease-in-out flex items-center justify-center relative transform scale-95 shadow-inner shadow-shadow  bg-bg-primary'
const spanClass =
  'top-0 left-0 rounded-full opacity-50 shadow-lg shadow-shadow w-full h-full duration-200 active:shadow-inner bg-bg-primary'

export const Button = ({
  content,
  state = false,
  handleClick = () => {
    return
  },
}: Props) => {
  // defaultではstateはfalse, handleClickは空関数
  return (
    <>
      <button className={state ? activeButtonClass : buttonClass} onClick={handleClick}>
        <span className={state ? 'hidden' : spanClass}></span>
        {content}
      </button>
    </>
  )
}
