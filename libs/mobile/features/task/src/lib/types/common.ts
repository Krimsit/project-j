import type { RouteProp } from '@react-navigation/native'
import type { ShellNavigationProps, ShellRoutesProps } from '@mobile/models'

export type UseMutationProps = {
  setIsVisibleError: (value: boolean) => void
  setErrorMessage: (value: string) => void
}

export type TaskRouterProps = RouteProp<ShellRoutesProps, 'Task'>

export type TaskFormRouterProps = RouteProp<ShellRoutesProps, 'TaskForm'>

export type UseDeleteDeleteMutation = {
  navigation: ShellNavigationProps
}
