import type {
  NavigatorScreenParams,
  NavigationProp,
} from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { User, TaskPriority, UploadFileProps } from '@shared/models'

export enum Routes {
  Root = 'Root',
  Home = 'Home',
  Projects = 'Projects',
  User = 'User',
  Task = 'Task',
  Project = 'Project',
  ProjectForm = 'ProjectForm',
  TaskForm = 'TaskForm',
  Auth = 'Auth',
}

export type ShellRoutesProps = {
  Auth: undefined
  Root: undefined
  Task: {
    taskId: string
  }
  TaskForm: {
    project_id: string
    defaultValues?: {
      _id: string
      task_name: string
      due_date: string
      priority: TaskPriority
      assigner: string
      description: string
    }
  }
  ProjectForm: {
    defaultValues?: {
      _id: string
      name: string
      image: UploadFileProps
      users: User[]
    }
  }
  Project: {
    projectId: string
  }
}

export type RootRoutesProps = {
  Home: undefined
  Projects: undefined
  User: undefined
}

export type RoutesNavigationProps = {
  Home: NavigatorScreenParams<RootRoutesProps>
  Projects: NavigatorScreenParams<RootRoutesProps>
  User: NavigatorScreenParams<RootRoutesProps>
}

export type ShellNavigationProps = NativeStackNavigationProp<ShellRoutesProps>

export type NavigationProps = NavigationProp<RoutesNavigationProps>
