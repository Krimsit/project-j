import type {
  NavigatorScreenParams,
  NavigationProp,
} from '@react-navigation/native'
import type { User, TaskPriority, UploadFileProps } from '@shared/models'

export enum Routes {
  ApiSelect = 'ApiSelect',
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

export type DrawerRoutesProps = {
  ApiSelect: undefined
  Auth: undefined
  Root: undefined
  Task: {
    taskId: string
  }
  TaskForm: {
    project_id: string
    defaultValues?: {
      _id: string
      name: string
      dueDate: string
      priority: TaskPriority
      assigner: string
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

export type MainRoutesProps = {
  Auth: undefined
  Root: undefined
  Task: {
    taskId: string
  }
  TaskForm: {
    project_id: string
    defaultValues?: {
      _id: string
      name: string
      dueDate: string
      priority: TaskPriority
      assigner: string
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

export type NavigationProps = NavigationProp<RoutesNavigationProps>

export type DrawerNavigationProps = NavigationProp<DrawerRoutesProps>
