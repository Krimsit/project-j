import type {
  NavigatorScreenParams,
  NavigationProp,
} from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { User, TaskPriority } from '@shared/models'

export enum Routes {
  Root = 'Root',
  Home = 'Home',
  Projects = 'Projects',
  User = 'User',
  Task = 'Task',
  AllProjects = 'AllProjects',
  Project = 'Project',
  AddProject = 'AddProject',
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
