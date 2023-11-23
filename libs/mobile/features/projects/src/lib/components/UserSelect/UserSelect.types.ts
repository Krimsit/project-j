import type { User } from '@shared/models'

export type UserSelectProps = {
  isOpen: boolean
  onApply: (users: User[]) => void
  onClose: () => void
  selectedUsers?: User[]
}
