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
        className={
          theme === 'dark'
            ? state
              ? styles.button + ' scale-90'
              : styles.activeButton + ' active:scale-90'
            : state
            ? styles.activeButton + ' scale-95'
            : styles.button + ' active:scale-95'
        }
        onClick={handleClick}
      >
        {content}
      </button>
    </>
  )
}
