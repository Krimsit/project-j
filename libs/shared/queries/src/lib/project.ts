import { gql } from '@apollo/client'

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
      allTasksCount
      completedTasksCount
    }
  }
`

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
      allTasksCount
      completedTasksCount
    }
  }
`

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
      allTasksCount
      completedTasksCount
    }
  }
`

export const updateProjectUsersMutations = gql`
  mutation updateProjectUsersMutations(
    $value: UpdateProjectUsersForm!
    $projectId: String!
  ) {
    updateProjectUsers(data: $value, projectId: $projectId) {
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
      allTasksCount
      completedTasksCount
    }
  }
`

export const deleteProjectMutation = gql`
  mutation deleteProjectMutation($value: String!) {
    deleteProject(projectId: $value)
  }
`

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
      allTasksCount
      completedTasksCount
    }
  }
`
