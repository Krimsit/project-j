import type { User } from './user'
import type { Task } from './task'

export type TaskComment = {
  _id: string
  task: Task
  user: User
  message: string
  createdAt: string
}
