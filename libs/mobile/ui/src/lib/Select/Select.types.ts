export type SelectProps<T> = {
  isOpen: boolean
  onApply: (users?: T) => void
  onClose: () => void
  value?: T
  values: T[]
  searchField?: keyof T
  valueField: keyof T
  labelField: keyof T
}
