import styles from '@/components/atoms/Button.module.css'

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
  return (
    <>
      <button className={state ? styles.activeButton : styles.button} onClick={handleClick}>
        {state ? null : <div className={styles.span}></div>}
        {content}
      </button>
    </>
  )
}
