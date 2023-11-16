import type {
  NavigatorScreenParams,
  NavigationProp,
} from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export enum Routes {
  Root = 'Root',
  Home = 'Home',
  Projects = 'Projects',
  User = 'User',
  Task = 'Task',
  AllProjects = 'AllProjects',
  Project = 'Project',
}

export type ShellRoutesProps = {
  Root: undefined
  Task: {
    taskId: string
  }
}

export type RootRoutesProps = {
  Home: undefined
  Projects: undefined
  User: undefined
}

export type ProjectRoutes = {
  AllProjects: undefined
  Project: {
    projectId: string
  }
}

export type RoutesNavigationProps = {
  Home: NavigatorScreenParams<RootRoutesProps>
  Projects: NavigatorScreenParams<ProjectRoutes>
  User: NavigatorScreenParams<RootRoutesProps>
}

export type ShellNavigationProps = NativeStackNavigationProp<ShellRoutesProps>

export type NavigationProps = NavigationProp<RoutesNavigationProps>
