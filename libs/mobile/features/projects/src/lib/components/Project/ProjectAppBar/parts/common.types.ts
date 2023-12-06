import type { NavigationProps, DrawerNavigationProps } from '@mobile/models'
import type { Project } from '@shared/models'

export type MenuItemProps = {
  onClose: () => void
  data: Project
  navigation: NavigationProps
}

export type EditItemProps = Omit<MenuItemProps, 'navigation'> & {
  navigation: DrawerNavigationProps
}
