import { gql } from '@apollo/client'

import type {
  Project,
  ProjectForm,
  UpdateProjectUsersForm,
} from '@shared/models'

export type CreateProjectMutationResult = {
  createProject: Project
}

export type CreateProjectMutationVariables = {
  value: ProjectForm
}

export const createProjectMutation = gql`
  mutation createProjectMutation($value: ProjectForm!) {
    createProject(data: $value) {
      _id
      image
      name
      owner {
        _id
        email
        username
        first_name
        last_name
        createdAt
      }
      createdAt
    }
  }
`

export type GetProjectQueryResult = {
  getProject: Project
}

export type GetProjectQueryVariables = {
  value: string
}

export const getProjectQuery = gql`
  query getProject($value: String!) {
    getProject(projectId: $value) {
      _id
      image
      name
      users {
        _id
        email
        username
        first_name
        last_name
        createdAt
      }
      owner {
        _id
        email
        username
        first_name
        last_name
        createdAt
      }
      createdAt
    }
  }
`

export type GetUserProjectsQueryResult = {
  getUserProjects: Project[]
}

export const getUserProjectsQuery = gql`
  query getUserProjectsQuery {
    getUserProjects {
      _id
      image
      name
      owner {
        _id
        email
        username
        first_name
        last_name
        createdAt
      }
      createdAt
    }
  }
`

export type UpdateProjectUserMutationResult = {
  updateProjectUsers: Project
}

export type UpdateProjectUsersMutationVariables = {
  value: UpdateProjectUsersForm
}

export const updateProjectUsersMutations = gql`
  mutation updateProjectUsersMutations($value: UpdateProjectUsersForm!) {
    updateProjectUsers(data: $value) {
      _id
      image
      name
      owner {
        _id
        email
        username
        first_name
        last_name
        createdAt
      }
      users {
        _id
        email
        username
        first_name
        last_name
        createdAt
      }
      createdAt
    }
  }
`

export type DeleteProjectMutationResult = {
  deleteProject: boolean
}

export type DeleteProjectMutationVariables = {
  value: string
}

export const deleteProjectMutation = gql`
  mutation deleteProjectMutation($value: String!) {
    deleteProject(projectId: $value)
  }
`

export type UpdateProjectMutationResult = {
  updateProject: Project
}

export type UpdateProjectMutationVariables = {
  value: ProjectForm
  projectId: string
}

export const updateProjectMutation = gql`
  mutation updateProjectMutation($value: ProjectForm!, $projectId: String!) {
    updateProject(data: $value, projectId: $projectId) {
      _id
      image
      name
      owner {
        _id
        email
        username
        first_name
        last_name
        createdAt
      }
      createdAt
    }
  }
`
