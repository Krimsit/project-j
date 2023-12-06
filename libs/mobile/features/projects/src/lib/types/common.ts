import type { RouteProp } from '@react-navigation/native'
import type { NavigationProps, MainRoutesProps } from '@mobile/models'

export type UseMutationProps = {
  setIsVisibleError: (value: boolean) => void
  setErrorMessage: (value: string) => void
}

export type ProjectRouterProps = RouteProp<MainRoutesProps, 'Project'>

export type ProjectFormRouterProps = RouteProp<MainRoutesProps, 'ProjectForm'>

export type UseDeleteProjectMutation = {
  navigation: NavigationProps
}
