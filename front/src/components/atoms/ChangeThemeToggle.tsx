import styles from '@/components/atoms/ChangeThemeToggle.module.css'
import { useState } from 'react'
import { useTheme } from 'next-themes'

export const ChangeThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [isActive, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!isActive)
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <>
      <button
        aria-label='DarkModeToggle'
        type='button'
        className={isActive ? styles.toggle_on : styles.toggle_off}
        onClick={handleToggle}
      >
        <span className={styles.toggle_button}></span>
      </button>
    </>
  )
}
