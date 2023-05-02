import { useState } from 'react'
import type { NextPage } from 'next'
import styles from '@/pages/login/login.module.css'
import { handleSubmit } from '@/lib/api'

const Login: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSubmit(username, password)
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        UserName:
        <input
          className={styles.input}
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label className={styles.label}>
        Password :
        <input
          className={styles.input}
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type='submit'>ログイン</button>
    </form>
  )
}

export default Login
