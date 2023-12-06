import type { DrawerNavigationProps } from '@mobile/models'
import type { Task } from '@shared/models'

export type MenuItemProps = {
  data: Task
  onClose: () => void
  navigation: DrawerNavigationProps
}
