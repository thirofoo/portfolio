import { useState } from 'react'
import { Button } from '@/components/atoms/Button'

type TagSearchCardProps = {
  onSearch: (tag: string) => void
}

export const TagSearchCard: React.FC<TagSearchCardProps> = ({ onSearch }) => {
  const [searchTag, setSearchTag] = useState('')

  const handleSearch = () => {
    onSearch(searchTag)
  }

  return (
    <>
      <input
        type='text'
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        className='mx-4'
        defaultValue='Search by tag'
      />
      <Button content='Search' handleClick={handleSearch} />
    </>
  )
}
