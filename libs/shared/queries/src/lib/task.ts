import { gql } from '@apollo/client'

export const createTaskMutation = gql`
  mutation createTaskMutation($value: TaskForm!) {
    createTask(data: $value) {
      _id
      name
      assigner {
        _id
        username
        email
        avatar
      }
      project {
        _id
        name
        image
      }
      dueData
      priority
      status
      attachments
      createdAt
    }
  }
`

export const updateTaskMutation = gql`
  mutation updateTaskMutation($value: TaskForm!, $taskId: String!) {
    updateTask(data: $value, taskId: $taskId) {
      _id
      name
      assigner {
        _id
        username
        email
        avatar
      }
      project {
        _id
        name
        image
      }
      dueData
      priority
      status
      attachments
      createdAt
    }
  }
`

export const updateTaskAssignerMutation = gql`
  mutation updateTaskAssignerMutation(
    $value: UpdateTaskAssignerForm!
    $taskId: String!
  ) {
    updateTaskAssigner(data: $value, taskId: $taskId) {
      _id
      name
      assigner {
        _id
        username
        email
        avatar
      }
      project {
        _id
        name
        image
      }
      dueData
      priority
      status
      attachments
      createdAt
    }
  }
`

export const updateTaskStatusMutation = gql`
  mutation updateTaskStatusMutation(
    $value: UpdateTaskStatusForm!
    $taskId: String!
  ) {
    updateTaskStatus(data: $value, taskId: $taskId) {
      _id
      name
      assigner {
        _id
        username
        email
        avatar
      }
      project {
        _id
        name
        image
      }
      dueData
      priority
      status
      attachments
      createdAt
    }
  }
`

export const updateTaskAttachmentsMutation = gql`
  mutation updateTaskAttachmentsMutation(
    $value: UpdateTaskAttachmentsForm!
    $taskId: String!
  ) {
    updateTaskAttachments(data: $value, taskId: $taskId) {
      _id
      name
      assigner {
        _id
        username
        email
        avatar
      }
      project {
        _id
        name
        image
      }
      dueData
      priority
      status
      attachments
      createdAt
    }
  }
`

export const deleteTaskMutation = gql`
  mutation deleteTaskMutation($value: String!) {
    deleteTask(taskId: $value) {
      _id
    }
  }
`

export const getUserTasksQuery = gql`
  query getUserTasksQuery {
    getUserTasks {
      _id
      name
      assigner {
        _id
        username
        email
        avatar
      }
      project {
        _id
        name
        image
      }
      dueData
      priority
      status
      attachments
      createdAt
    }
  }
`

export const getProjectTasksQuery = gql`
  query getProjectTasksQuery($value: String!) {
    getProjectTasks(projectId: $value) {
      _id
      name
      assigner {
        _id
        username
        email
        avatar
      }
      project {
        _id
        name
        image
      }
      dueData
      priority
      status
      attachments
      createdAt
    }
  }
`

export const getTaskQuery = gql`
  query getTaskQuery($value: String!) {
    getTask(taskId: $value) {
      _id
      name
      assigner {
        _id
        username
        email
        avatar
      }
      project {
        _id
        name
        image
      }
      dueData
      priority
      status
      attachments
      createdAt
    }
  }
`

export const getTaskNextStatusesQuery = gql`
  query getTaskNextStatuses($value: String!) {
    getTaskNextStatuses(taskId: $value) {
      value
      label
    }
  }
`
