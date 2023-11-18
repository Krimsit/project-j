import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export type BottomBarProps = Pick<
  BottomTabBarProps,
  'descriptors' | 'insets' | 'navigation' | 'state'
>
