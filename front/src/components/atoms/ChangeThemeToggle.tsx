import styles from '@/components/atoms/ChangeThemeToggle.module.css'
import { HalfMoon } from '@/components/atoms/icons/HalfMoon'
import { SunLight } from '@/components/atoms/icons/SunLight'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ChangeThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <button aria-label="DarkModeToggle" type="button" className={styles.toggle} disabled />
  }

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
