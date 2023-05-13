import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { SunLight, HalfMoon } from 'iconoir-react'
import styles from '@/components/atoms/ChangeThemeToggle.module.css'

export const ChangeThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <button
        aria-label='DarkModeToggle'
        type='button'
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
        className={styles.toggle}
      >
        {theme === 'dark' ? <HalfMoon /> : <SunLight />}
      </button>
    </>
  )
}
