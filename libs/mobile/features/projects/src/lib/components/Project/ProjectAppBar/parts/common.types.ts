import type { NavigationProps, ShellNavigationProps } from '@mobile/models'
import type { Project } from '@shared/models'

export type MenuItemProps = {
  onClose: () => void
  data: Project
  navigation: NavigationProps
}

export type EditItemProps = Omit<MenuItemProps, 'navigation'> & {
  navigation: ShellNavigationProps
}
