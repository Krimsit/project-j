export type SelectProps<T> = {
  isOpen: boolean
  onApply: (value?: T) => void
  onClose: () => void
  value?: T
  values: T[]
  searchField?: keyof T
  valueField: keyof T
  labelField: keyof T
  loading?: boolean
}

export type MultiSelectProps<T> = {
  isOpen: boolean
  onApply: (value: T[]) => void
  onClose: () => void
  value?: T[]
  values: T[]
  searchField?: keyof T
  valueField: keyof T
  labelField: keyof T
  loading?: boolean
}
