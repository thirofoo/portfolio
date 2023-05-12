import styles from '@/components/atoms/Button.module.css'
import { useTheme } from 'next-themes'

type Props = {
  content: string
  state?: boolean
  handleClick?: () => void
}

export const Button = ({
  content,
  state = false,
  handleClick = () => {
    return
  },
}: Props) => {
  const { theme } = useTheme()
  return (
    <>
      <button
        className={
          theme === 'dark'
            ? state
              ? styles.button + ' scale-95'
              : styles.activeButton + ' active:scale-95'
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
