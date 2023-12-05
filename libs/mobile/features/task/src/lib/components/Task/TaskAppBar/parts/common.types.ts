import type { ShellNavigationProps } from '@mobile/models'
import type { Task } from '@shared/models'

export type MenuItemProps = {
  data: Task
  onClose: () => void
  navigation: ShellNavigationProps
}
