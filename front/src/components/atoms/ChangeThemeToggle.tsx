import styles from '@/components/atoms/ChangeThemeToggle.module.css'
import { HalfMoon, SunLight } from 'iconoir-react'
import { useTheme } from 'next-themes'

export const ChangeThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <button
        aria-label='DarkModeToggle'
        type='button'
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        }}
        className={styles.toggle}
      >
        {theme === 'light' ? <SunLight /> : <HalfMoon />}
      </button>
    </>
  )
}
