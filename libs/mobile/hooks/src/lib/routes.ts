import { useNavigation as useNavigationBase } from '@react-navigation/native'

import type { NavigationProps, DrawerNavigationProps } from '@mobile/models'

export const useNavigation = () => useNavigationBase<NavigationProps>()

export const useRootNavigation = () =>
  useNavigationBase<DrawerNavigationProps>()
