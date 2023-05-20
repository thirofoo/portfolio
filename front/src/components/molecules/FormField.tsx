import { ChangeEvent } from 'react'
import styles from './FormField.module.css'
import { FieldInfo } from '@/Interfaces/FieldInfo'

export const FormField = ({ id, label, value, onChange, textarea }: FieldInfo) => {
  // ChangeEvent<HTMLInputElement | HTMLTextAreaElement>は、入力fieldの値が変更された際のイベントオブジェクトの型
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={styles['form-group']}>
      <label htmlFor={id} className={styles.label}>
        {label}:
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={handleInputChange}
          className={styles.textarea}
          required={id === 'thumbnail' ? false : true}
        />
      ) : (
        <input
          type='text'
          id={id}
          value={value}
          onChange={handleInputChange}
          className={styles.input}
          required={id === 'thumbnail' ? false : true}
        />
      )}
    </div>
  )
}
