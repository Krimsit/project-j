import { useParams, useNavigate } from '@tanstack/react-router'
import {
  useQuery,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { boardEndpoints } from '@shared/api'
import { httpClient } from '@config'

import type {
  ProjectBoard,
  BoardResponse,
  CreateBoardRequest,
  UpdateBoardRequest,
} from '@shared/types'

const httpBoard = (boardId: string): Promise<BoardResponse> =>
  httpClient
    .get(boardEndpoints.get, {
      params: {
        id: boardId,
      },
    })
    .then((response) => response.data)

export const boardQuery = (boardId: string) =>
  queryOptions({
    queryKey: ['boards', boardId],
    queryFn: () => httpBoard(boardId),
    enabled: Boolean(boardId),
  })

export const useBoard = () => {
  const params = useParams({ strict: false })

  return useQuery(boardQuery(params.boardId ?? ''))
}

const httpProjectBoards = (projectId: string): Promise<ProjectBoard[]> =>
  httpClient
    .get(boardEndpoints.projectBoard, {
      params: {
        projectId: projectId,
      },
    })
    .then((response) => response.data)

export const useProjectBoards = () => {
  const params = useParams({ strict: false })

  return useQuery<ProjectBoard[]>({
    queryKey: ['boards', 'project'],
    queryFn: () => httpProjectBoards(params.projectId ?? ''),
  })
}

const httpCreateBoard = (
  projectId: string,
  data: CreateBoardRequest,
): Promise<BoardResponse> =>
  httpClient
    .post(boardEndpoints.create, data, {
      params: {
        projectId,
      },
    })
    .then((response) => response.data)

export const useCreateBoard = () => {
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<BoardResponse, Error, CreateBoardRequest>({
    mutationKey: ['boards', 'create'],
    mutationFn: (data) => httpCreateBoard(params.projectId ?? '', data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['boards', 'project'],
      })
      await navigate({
        to: '/dashboard/$projectId/boards/$boardId',
        params: {
          projectId: params.projectId ?? '',
          boardId: data.id,
        },
      })
    },
  })
}

const httpUpdateBoard = (
  boardId: string,
  data: UpdateBoardRequest,
): Promise<BoardResponse> =>
  httpClient
    .patch(boardEndpoints.update, data, {
      params: {
        id: boardId,
      },
    })
    .then((response) => response.data)

export const useUpdateBoard = () => {
  const params = useParams({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<BoardResponse, Error, UpdateBoardRequest>({
    mutationKey: ['boards', params.boardId, 'update'],
    mutationFn: (data) => httpUpdateBoard(params.boardId ?? '', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['boards', params.boardId],
      })
      await queryClient.invalidateQueries({
        queryKey: ['boards', 'project'],
      })
    },
  })
}

const httpDeleteBoard = (boardId: string): Promise<BoardResponse> =>
  httpClient
    .delete(boardEndpoints.delete, {
      params: {
        id: boardId,
      },
    })
    .then((response) => response.data)

export const useDeleteBoard = () => {
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const queryClient = useQueryClient()

  return useMutation<BoardResponse, Error, never>({
    mutationKey: ['boards', params.boardId, 'delete'],
    mutationFn: () => httpDeleteBoard(params.boardId ?? ''),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['boards', 'project'],
      })
      await navigate({
        to: '/dashboard/$projectId',
        params: {
          projectId: params.projectId ?? '',
        },
      })
    },
  })
}
