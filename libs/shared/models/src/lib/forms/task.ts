import type { TaskPriority, TaskStatus } from '../task'
import type { UploadFileProps } from './common'

export type TaskForm = {
  project_id: string
  name: string
  dueData: string
  assigner: string
  priority: TaskPriority
  attachments?: UploadFileProps[]
}

export type UpdateTaskAssignerForm = {
  assigner: string
}

export type UpdateTaskStatusForm = {
  status: TaskStatus
}

export type UpdateTaskAttachmentsForm = {
  attachments: UploadFileProps[]
}
