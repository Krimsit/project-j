import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { Routes } from '@mobile/models'
import {
  getTaskQuery,
  getTaskNextStatusesQuery,
  updateTaskAssignerMutation,
  updateTaskStatusMutation,
  updateTaskAttachmentsMutation,
  deleteTaskMutation,
} from '@shared/queries'

import type {
  GetTaskQueryResult,
  GetTaskQueryVariables,
  GetTaskNextStatusesQueryResult,
  GetTaskNextStatusesQueryVariables,
  UpdateTaskAssignerMutationResult,
  UpdateTaskAssignerMutationVariables,
  UpdateTaskStatusMutationResult,
  UpdateTaskStatusMutationVariables,
  UpdateTaskAttachmentsMutationResult,
  UpdateTaskAttachmentsMutationVariables,
  DeleteTaskMutationResult,
  DeleteTaskMutationVariables,
} from '@shared/models'
import type { TaskRouterProps, UseDeleteDeleteMutation } from '../types'

export const useTaskQuery = () => {
  const router = useRoute<TaskRouterProps>()
  const id = router.params.taskId

  return useQuery<GetTaskQueryResult, GetTaskQueryVariables>(getTaskQuery, {
    variables: {
      value: id,
    },
  })
}

export const useTaskNextStatusesQuery = () => {
  const router = useRoute<TaskRouterProps>()
  const id = router.params.taskId

  return useLazyQuery<
    GetTaskNextStatusesQueryResult,
    GetTaskNextStatusesQueryVariables
  >(getTaskNextStatusesQuery, {
    variables: {
      value: id,
    },
  })
}

export const useUpdateTaskAssignerMutation = () =>
  useMutation<
    UpdateTaskAssignerMutationResult,
    UpdateTaskAssignerMutationVariables
  >(updateTaskAssignerMutation)

export const useUpdateTaskStatusMutation = () =>
  useMutation<
    UpdateTaskStatusMutationResult,
    UpdateTaskStatusMutationVariables
  >(updateTaskStatusMutation)

export const useUpdateTaskAttachmentsMutation = () =>
  useMutation<
    UpdateTaskAttachmentsMutationResult,
    UpdateTaskAttachmentsMutationVariables
  >(updateTaskAttachmentsMutation)

export const useDeleteTaskMutation = ({
  navigation,
}: UseDeleteDeleteMutation) => {
  const handleComplete = (data: DeleteTaskMutationResult) => {
    navigation.navigate(Routes.Task, {
      taskId: data.deleteTask._id,
    })
  }

  return useMutation<DeleteTaskMutationResult, DeleteTaskMutationVariables>(
    deleteTaskMutation,
    {
      onCompleted: handleComplete,
    },
  )
}
