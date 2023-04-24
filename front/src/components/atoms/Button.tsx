type Props = {
  content: string
  state?: boolean
  handleClick?: () => void // props経由でhandleを操作
}

const buttonClass: string =
  'font-bold rounded-full py-4 px-16 shadow-lg shadow-shadow transition duration-200 ease-in-out hover:shadow-md flex items-center justify-center relative transform active:scale-95 active:shadow-inner border-t-[1px] border-shadow'
const activeButtonClass: string =
  'font-bold rounded-full py-4 px-16 transition duration-200 ease-in-out flex items-center justify-center relative transform scale-95 shadow-inner shadow-shadow'
const spanClass: string =
  'absolute top-0 left-0 rounded-full opacity-50 shadow-lg shadow-shadow w-full h-full duration-200 active:shadow-inner'

const Button = ({ content, state = false, handleClick = () => {} }: Props) => {
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
export default Button
