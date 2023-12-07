import type { Project } from '../project'
import type { ProjectForm, UpdateProjectUsersForm } from '../forms'

export type CreateProjectMutationResult = {
  createProject: Project
}

export type CreateProjectMutationVariables = {
  value: ProjectForm
}

export type GetProjectQueryResult = {
  getProject: Project
}

export type GetProjectQueryVariables = {
  value: string
}

export type GetUserProjectsQueryResult = {
  getUserProjects: Project[]
}

export type UpdateProjectUserMutationResult = {
  updateProjectUsers: Project
}

export type UpdateProjectUsersMutationVariables = {
  value: UpdateProjectUsersForm
  projectId: string
}

export type DeleteProjectMutationResult = {
  deleteProject: boolean
}

export type DeleteProjectMutationVariables = {
  value: string
}

export type UpdateProjectMutationResult = {
  updateProject: Project
}

export type UpdateProjectMutationVariables = {
  value: ProjectForm
  projectId: string
}
