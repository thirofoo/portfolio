import styles from '@/components/atoms/Button.module.css'

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
