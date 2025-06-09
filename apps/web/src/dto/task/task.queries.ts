import {
  useParams,
  useSearch,
  useNavigate,
  useLocation,
} from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskEndpoints } from '@shared/api'
import { httpClient } from '@config'

import type {
  TaskResponse,
  TaskCardResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskNextStatusesResponse,
} from '@shared/types'

const httpTask = (taskId: string): Promise<TaskResponse> =>
  httpClient
    .get(taskEndpoints.get, {
      params: {
        id: taskId,
      },
    })
    .then((response) => response.data)

export const useTask = () => {
  const search = useSearch({ strict: false })

  return useQuery({
    queryKey: ['tasks', search.taskId],
    queryFn: () => httpTask(search.taskId ?? ''),
    enabled: Boolean(search.taskId),
  })
}

const httpBoardTasks = (boardId: string): Promise<TaskCardResponse[]> =>
  httpClient
    .get(taskEndpoints.boardTasks, {
      params: {
        boardId,
      },
    })
    .then((response) => response.data)

export const useBoardTask = () => {
  const params = useParams({ strict: false })

  return useQuery({
    queryKey: ['tasks', 'board', params.boardId],
    queryFn: () => httpBoardTasks(params.boardId ?? ''),
  })
}

const httpUserProjectTasks = (projectId: string): Promise<TaskCardResponse[]> =>
  httpClient
    .get(taskEndpoints.userProjectTasks, {
      params: {
        projectId,
      },
    })
    .then((response) => response.data)

export const useUserProjectTask = () => {
  const params = useParams({ strict: false })

  return useQuery({
    queryKey: ['tasks', 'user_project', params.projectId],
    queryFn: () => httpUserProjectTasks(params.projectId ?? ''),
  })
}

const httpCreateTask = (
  projectId: string,
  boardId: string,
  data: CreateTaskRequest,
): Promise<TaskResponse> =>
  httpClient
    .post(taskEndpoints.create, data, {
      params: {
        projectId,
        boardId,
      },
    })
    .then((response) => response.data)

export const useCreateTask = () => {
  const params = useParams({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<TaskResponse, Error, CreateTaskRequest>({
    mutationKey: ['tasks', 'create'],
    mutationFn: (data) =>
      httpCreateTask(params.projectId ?? '', params.boardId ?? '', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'board', params.boardId],
      })
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'user_project', params.projectId],
      })
    },
  })
}

const httpUpdateTask = (
  taskId: string,
  data: UpdateTaskRequest,
): Promise<TaskResponse> =>
  httpClient
    .post(taskEndpoints.update, data, {
      params: {
        id: taskId,
      },
    })
    .then((response) => response.data)

export const useUpdateTask = () => {
  const params = useParams({ strict: false })
  const search = useSearch({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<TaskResponse, Error, UpdateTaskRequest>({
    mutationKey: ['tasks', search.taskId, 'update'],
    mutationFn: (data) => httpUpdateTask(search.taskId ?? '', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'board', params.boardId],
      })
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'user_project', params.projectId],
      })
    },
  })
}

const httpDeleteTask = (taskId: string): Promise<TaskResponse> =>
  httpClient
    .delete(taskEndpoints.delete, {
      params: {
        id: taskId,
      },
    })
    .then((response) => response.data)

export const useDeleteTask = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams({ strict: false })
  const search = useSearch({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<TaskResponse, Error, never>({
    mutationKey: ['tasks', search.taskId, 'delete'],
    mutationFn: () => httpDeleteTask(search.taskId ?? ''),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'board', params.boardId],
      })
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'user_project', params.projectId],
      })
      await navigate({
        to: location.pathname,
      })
    },
  })
}

const httpTaskNextStatuses = (
  taskId: string,
): Promise<TaskNextStatusesResponse> =>
  httpClient
    .get(taskEndpoints.nextStatuses, {
      params: {
        id: taskId,
      },
    })
    .then((response) => response.data)

export const useTaskNextStatuses = () => {
  const search = useSearch({ strict: false })

  return useQuery({
    queryKey: ['tasks', search.taskId, 'next_statuses'],
    queryFn: () => httpTaskNextStatuses(search.taskId ?? ''),
  })
}
