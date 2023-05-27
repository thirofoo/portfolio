import { useState } from 'react'
import styles from '@/components/molecules/SearchCard.module.css'

type SearchCardProps = {
  onSearch: (title: string, tag: string) => void
  items: string[]
}

export const SearchCard = ({ onSearch, items }: SearchCardProps) => {
  const [title, setTitle] = useState<string>('')
  const [tag, setTag] = useState<string>('')

  return (
    <>
      <div className={styles.wrapper}>
        {items.map((item, i) => (
          <div className={styles.form} key={i}>
            <label>{item}</label>
            <input
              type='text'
              onChange={(e) => {
                // state更新は非同期
                // → stateをonSearchに返すと変更前に引数を渡してしまう
                if (i === 0) {
                  setTitle(e.target.value)
                  onSearch(e.target.value, tag)
                } else {
                  setTag(e.target.value)
                  onSearch(title, e.target.value)
                }
              }}
              className={styles.input}
              placeholder='Search...'
            />
          </div>
        ))}
      </div>
    </>
  )
}
