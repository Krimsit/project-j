import { gql } from '@apollo/client'

import type { TaskComment, TaskCommentForm } from '@shared/models'

export type CreateTaskCommentMutationResult = {
  createTaskComment: TaskComment
}

export type CreateTaskCommentMutationVariables = {
  value: TaskCommentForm
}

export const createTaskCommentMutation = gql`
  mutation createTaskCommentMutation($value: TaskCommentForm!) {
    createTaskComment(data: $value) {
      _id
      user {
        username
        avatar
      }
      message
      createdAt
    }
  }
`

export type GetTaskCommentsQueryResult = {
  getTaskComments: TaskComment[]
}

export type GetTaskCommentsQueryVariables = {
  value: string
}

export const getTaskCommentsQuery = gql`
  query getTaskCommentsQuery($value: String!) {
    getTaskComments(taskId: $value) {
      _id
      user {
        username
        avatar
      }
      message
      createdAt
    }
  }
`
