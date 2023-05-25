import styles from '@/components/atoms/Button.module.css'
import { useTheme } from 'next-themes'

type Props = {
  content: string
  state?: boolean
  handleClick?: () => void
  type?: 'button' | 'submit' | 'reset' // 新たに追加
}

export const Button = ({
  content,
  state = false,
  handleClick = () => {
    return
  },
  type = undefined,
}: Props) => {
  const { theme } = useTheme()
  return (
    <>
      <button
        type={type}
        className={state ? styles.activeButton : styles.button}
        onClick={handleClick}
      >
        {content}
      </button>
    </>
  )
}
