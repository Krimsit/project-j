import type { RouteProp } from '@react-navigation/native'
import type { NavigationProps, ShellRoutesProps } from '@mobile/models'

export type TaskRouterProps = RouteProp<ShellRoutesProps, 'Task'>

export type TaskFormRouterProps = RouteProp<ShellRoutesProps, 'TaskForm'>

export type UseDeleteTaskMutation = {
  navigation: NavigationProps
}
