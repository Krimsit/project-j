import type {
  NavigatorScreenParams,
  NavigationProp,
} from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { User } from '@shared/models'

export enum Routes {
  Root = 'Root',
  Home = 'Home',
  Projects = 'Projects',
  User = 'User',
  Task = 'Task',
  AllProjects = 'AllProjects',
  Project = 'Project',
  AddProject = 'AddProject',
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
  AddProject: {
    defaultValues?: {
      _id: string
      name: string
      image: string
      selectedUsers: User[]
    }
  }
}

export type RoutesNavigationProps = {
  Home: NavigatorScreenParams<RootRoutesProps>
  Projects: NavigatorScreenParams<ProjectRoutes>
  User: NavigatorScreenParams<RootRoutesProps>
}

export type ShellNavigationProps = NativeStackNavigationProp<ShellRoutesProps>

export type NavigationProps = NavigationProp<RoutesNavigationProps>
