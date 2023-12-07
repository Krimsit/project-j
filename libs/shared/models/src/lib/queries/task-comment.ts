import type { TaskComment } from '../task-comment'
import type { TaskCommentForm } from '../forms'

export type CreateTaskCommentMutationResult = {
  createTaskComment: TaskComment
}

export type CreateTaskCommentMutationVariables = {
  value: TaskCommentForm
}

export type GetTaskCommentsQueryResult = {
  getTaskComments: TaskComment[]
}

export type GetTaskCommentsQueryVariables = {
  value: string
}
