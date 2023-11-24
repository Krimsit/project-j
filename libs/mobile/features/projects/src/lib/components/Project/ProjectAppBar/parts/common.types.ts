import type { NavigationProps } from '@mobile/models'

export type MenuItemProps = {
  onClose: () => void
}

export type EditProps = MenuItemProps & {
  navigation: NavigationProps
}
