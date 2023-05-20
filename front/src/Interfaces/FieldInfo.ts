export interface FieldInfo {
  id: string
  label: string
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  textarea?: boolean
}
