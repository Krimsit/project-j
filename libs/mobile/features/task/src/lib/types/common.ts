import type { RouteProp } from '@react-navigation/native'
import type { DrawerNavigationProps, MainRoutesProps } from '@mobile/models'

export type UseMutationProps = {
  setIsVisibleError: (value: boolean) => void
  setErrorMessage: (value: string) => void
}

export type TaskRouterProps = RouteProp<MainRoutesProps, 'Task'>

export type TaskFormRouterProps = RouteProp<MainRoutesProps, 'TaskForm'>

export type UseDeleteDeleteMutation = {
  navigation: DrawerNavigationProps
}
