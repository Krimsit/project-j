import { useNavigation as useNavigationBase } from '@react-navigation/native'

import type { ShellNavigationProps, NavigationProps } from '@mobile/models'

export const useRootNavigation = () => useNavigationBase<ShellNavigationProps>()

export const useNavigation = () => useNavigationBase<NavigationProps>()
