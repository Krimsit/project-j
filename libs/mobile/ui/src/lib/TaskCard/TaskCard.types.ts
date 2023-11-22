import type { TaskPriority } from '@shared/models'

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
