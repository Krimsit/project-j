export type TaskCardProps = {
  _id: string
  projectName: string
  name: string
  status: number
  dueDate: string
  priority: TaskPriority
  attachmentsCount: number
  assignedTasksCount: number
  assignerAvatar: string
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum TaskStatus {
  OnHold,
  ToDo,
  InProgress,
  Done,
}

export type PriorityItem = {
  value: TaskPriority
  label: string
}

export type TaskStatusItem = {
  value: TaskStatus
  label: string
}
