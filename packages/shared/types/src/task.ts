import { z } from 'zod'

import type { UserProfile } from './user'

export enum TaskStatus {
  ToDO = 'To Do',
  OnHold = 'On hold',
  InProgress = 'In progress',
  UnderReview = 'Under review',
  Done = 'Done',
  Cancelled = 'Cancelled',
}

export type TaskResponse = {
  id: string
  name: string
  description?: string
  assigner: UserProfile
  dueDate: Date
  status: TaskStatus
  files: string[]
}

export type TaskCardResponse = {
  id: string
  name: string
  assigner: UserProfile
  dueDate: Date
  status: TaskStatus
}

export const createTaskSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().min(1),
})

export type CreateTaskRequest = z.infer<typeof createTaskSchema>

export type UpdateTaskRequest = Partial<CreateTaskRequest>

export type UploadTaskFileRequest = {
  fileId: string
}

export type DeleteTaskFileRequest = {
  fileId: string
}

export type TaskNextStatusesResponse = TaskStatus[]
