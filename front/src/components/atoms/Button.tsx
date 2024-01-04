import styles from '@/components/atoms/Button.module.css'

type Props = {
  content: string
  state?: boolean
  handleClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  add_style?: string
}

export const Button = ({
  content,
  state = false,
  handleClick = () => {
    return
  },
  type = undefined,
  add_style = '',
}: Props) => {
  return (
    <>
      <button
        id='button'
        type={type}
        className={state ? styles.activeButton + ' ' + add_style : styles.button + ' ' + add_style}
        onClick={handleClick}
      >
        {content}
      </button>
    </>
  )
}
