import type { RouteProp } from '@react-navigation/native'
import type { NavigationProps, ShellRoutesProps } from '@mobile/models'

export type UseMutationProps = {
  setIsVisibleError: (value: boolean) => void
  setErrorMessage: (value: string) => void
}

export type ProjectRouterProps = RouteProp<ShellRoutesProps, 'Project'>

export type ProjectFormRouterProps = RouteProp<ShellRoutesProps, 'ProjectForm'>

export type UseDeleteProjectMutation = {
  navigation: NavigationProps
}
