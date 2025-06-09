import { useParams, useNavigate } from '@tanstack/react-router'
import {
  useQuery,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { projectEndpoints } from '@shared/api'
import { httpClient } from '@config'

import type {
  MyProject,
  ProjectResponse,
  CreateProjectRequest,
  UpdateProjectRequest,
} from '@shared/types'

const httpProject = (projectId: string): Promise<ProjectResponse> =>
  httpClient
    .get(projectEndpoints.get, {
      params: {
        id: projectId,
      },
    })
    .then((response) => response.data)

export const projectQuery = (projectId: string) =>
  queryOptions({
    queryKey: ['projects', projectId],
    queryFn: () => httpProject(projectId),
    enabled: Boolean(projectId),
  })

export const useProject = () => {
  const params = useParams({ strict: false })

  return useQuery(projectQuery(params.projectId ?? ''))
}

const httpMyProjects = (): Promise<MyProject[]> =>
  httpClient.get(projectEndpoints.myProjects).then((response) => response.data)

export const useMyProjects = () => {
  return useQuery<MyProject[]>({
    queryKey: ['projects', 'my'],
    queryFn: httpMyProjects,
  })
}

const httpCreateProject = (
  data: CreateProjectRequest,
): Promise<ProjectResponse> =>
  httpClient
    .post(projectEndpoints.create, data)
    .then((response) => response.data)

export const useCreateProject = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation<ProjectResponse, Error, CreateProjectRequest>({
    mutationKey: ['projects', 'create'],
    mutationFn: httpCreateProject,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['projects', 'my'],
      })
      await navigate({
        to: '/dashboard/$projectId',
        params: {
          projectId: data.id,
        },
      })
    },
  })
}

const httpUpdateProject = (
  projectId: string,
  data: UpdateProjectRequest,
): Promise<ProjectResponse> =>
  httpClient
    .patch(projectEndpoints.update, data, {
      params: {
        id: projectId,
      },
    })
    .then((response) => response.data)

export const useUpdateProject = () => {
  const params = useParams({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<ProjectResponse, Error, UpdateProjectRequest>({
    mutationKey: ['projects', params.projectId, 'update'],
    mutationFn: (data) => httpUpdateProject(params.projectId ?? '', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['projects', params.projectId],
      })
      await queryClient.invalidateQueries({
        queryKey: ['projects', 'my'],
      })
    },
  })
}

const httpDeleteProject = (projectId: string): Promise<ProjectResponse> =>
  httpClient
    .delete(projectEndpoints.delete, {
      params: {
        id: projectId,
      },
    })
    .then((response) => response.data)

export const useDeleteProject = () => {
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<ProjectResponse, Error, never>({
    mutationKey: ['projects', params.projectId, 'delete'],
    mutationFn: () => httpDeleteProject(params.projectId ?? ''),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['projects', 'my'],
      })
      await navigate({
        to: '/dashboard',
      })
    },
  })
}
