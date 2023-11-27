import type { ShellNavigationProps } from '@mobile/models'

export type MenuItemProps = {
  onClose: () => void
}

export type EditProps = MenuItemProps & {
  navigation: ShellNavigationProps
}
