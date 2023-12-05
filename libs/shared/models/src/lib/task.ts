import type { User } from './user'
import type { Project } from './project'

export type Task = {
  _id: string
  name: string
  dueData: string
  assigner: User
  priority: TaskPriority
  status: TaskStatus
  attachments: string[]
  project: Omit<Project, 'allTasksCount' | 'completedTasksCount'>
}

export enum TaskPriority {
  Low,
  Medium,
  High,
}

export enum TaskStatus {
  OnHold,
  ToDo,
  InProgress,
  UnderReview,
  Done,
}

export type TaskPriorityItem = {
  value: TaskPriority
  label: string
}

export type TaskStatusItem = {
  value: TaskStatus
  label: string
}
