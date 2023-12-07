import type { Task, TaskStatusItem } from '../task'
import type {
  TaskForm,
  UpdateTaskAssignerForm,
  UpdateTaskAttachmentsForm,
  UpdateTaskStatusForm,
} from '../forms'

export type CreateTaskMutationResult = {
  createTask: Task
}

export type CreateTaskMutationVariables = {
  value: TaskForm
}

export type UpdateTaskMutationResult = {
  updateTask: Task
}

export type UpdateTaskMutationVariables = {
  value: TaskForm
  taskId: string
}

export type UpdateTaskAssignerMutationResult = {
  updateTaskAssigner: Task
}

export type UpdateTaskAssignerMutationVariables = {
  value: UpdateTaskAssignerForm
  taskId: string
}

export type UpdateTaskStatusMutationResult = {
  updateTaskStatus: Task
}

export type UpdateTaskStatusMutationVariables = {
  value: UpdateTaskStatusForm
  taskId: string
}

export type UpdateTaskAttachmentsMutationResult = {
  updateTaskAttachments: Task
}

export type UpdateTaskAttachmentsMutationVariables = {
  value: UpdateTaskAttachmentsForm
  taskId: string
}

export type DeleteTaskMutationResult = {
  deleteTask: Task
}

export type DeleteTaskMutationVariables = {
  value: string
}

export type GetUserTasksQueryResult = {
  getUserTasks: Task[]
}

export type GetProjectTasksQueryResult = {
  getProjectTasks: Task[]
}

export type GetProjectTasksQueryVariables = {
  value: string
}

export type GetTaskQueryResult = {
  getTask: Task
}

export type GetTaskQueryVariables = {
  value: string
}

export type GetTaskNextStatusesQueryResult = {
  getTaskNextStatuses: TaskStatusItem[]
}

export type GetTaskNextStatusesQueryVariables = {
  value: string
}
