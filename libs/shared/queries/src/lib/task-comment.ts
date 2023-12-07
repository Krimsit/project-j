import { gql } from '@apollo/client'

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
