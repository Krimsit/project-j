import { gql } from '@apollo/client'

import type {
  Task,
  TaskForm,
  UpdateTaskAssignerForm,
  UpdateTaskStatusForm,
  UpdateTaskAttachmentsForm,
  TaskStatusItem,
} from '@shared/models'

export type CreateTaskMutationResult = {
  createTask: Task
}

export type CreateTaskMutationVariables = {
  value: TaskForm
}

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

export type UpdateTaskMutationResult = {
  updateTask: Task
}

export type UpdateTaskMutationVariables = {
  value: TaskForm
  taskId: string
}

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

export type UpdateTaskAssignerMutationResult = {
  updateTaskAssigner: Task
}

export type UpdateTaskAssignerMutationVariables = {
  value: UpdateTaskAssignerForm
  taskId: string
}

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

export type UpdateTaskStatusMutationResult = {
  updateTaskStatus: Task
}

export type UpdateTaskStatusMutationVariables = {
  value: UpdateTaskStatusForm
  taskId: string
}

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

export type UpdateTaskAttachmentsMutationResult = {
  updateTaskAttachments: Task
}

export type UpdateTaskAttachmentsMutationVariables = {
  value: UpdateTaskAttachmentsForm
  taskId: string
}

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

export type DeleteTaskMutationResult = {
  deleteTask: Task
}

export type DeleteTaskMutationVariables = {
  value: string
}

export const deleteTaskMutation = gql`
  mutation deleteTaskMutation($value: String!) {
    deleteTask(taskId: $value) {
      _id
    }
  }
`

export type GetUserTasksQueryResult = {
  getUserTasks: Task[]
}

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

export type GetProjectTasksQueryResult = {
  getProjectTasks: Task[]
}

export type GetProjectTasksQueryVariables = {
  value: string
}

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

export type GetTaskQueryResult = {
  getTask: Task
}

export type GetTaskQueryVariables = {
  value: string
}

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

export type GetTaskNextStatusesQueryResult = {
  getTaskNextStatuses: TaskStatusItem[]
}

export type GetTaskNextStatusesQueryVariables = {
  value: string
}

export const getTaskNextStatusesQuery = gql`
  query getTaskNextStatuses($value: String!) {
    getTaskNextStatuses(taskId: $value) {
      value
      label
    }
  }
`
