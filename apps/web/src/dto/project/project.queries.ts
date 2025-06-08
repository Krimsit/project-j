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

const httpCreateProjects = (
  data: CreateProjectRequest,
): Promise<ProjectResponse> =>
  httpClient
    .post(projectEndpoints.create, data)
    .then((response) => response.data)

export const useCreateProjects = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation<ProjectResponse, Error, CreateProjectRequest>({
    mutationKey: ['projects', 'create'],
    mutationFn: httpCreateProjects,
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

const httpUpdateProjects = (
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

export const useUpdateProjects = () => {
  const params = useParams({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<ProjectResponse, Error, UpdateProjectRequest>({
    mutationKey: ['projects', params.projectId, 'update'],
    mutationFn: (data) => httpUpdateProjects(params.projectId ?? '', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['projects', params.projectId],
      })
    },
  })
}

const httpDeleteProjects = (projectId: string): Promise<ProjectResponse> =>
  httpClient
    .delete(projectEndpoints.delete, {
      params: {
        id: projectId,
      },
    })
    .then((response) => response.data)

export const useDeleteProjects = () => {
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<ProjectResponse, Error, never>({
    mutationKey: ['projects', 'delete'],
    mutationFn: () => httpDeleteProjects(params.projectId ?? ''),
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
