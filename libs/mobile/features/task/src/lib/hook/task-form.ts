import { useMutation } from '@apollo/client'
import { useRootNavigation } from '@mobile/hooks'
import { createTaskMutation, updateTaskMutation } from '@shared/queries'
import { Routes } from '@mobile/models'

import type { ApolloError } from '@apollo/client'
import type {
  CreateTaskMutationResult,
  CreateTaskMutationVariables,
  UpdateTaskMutationResult,
  UpdateTaskMutationVariables,
} from '@shared/queries'
import type { UseMutationProps } from '../types'

export const useCreateTaskMutation = ({
  setErrorMessage,
  setIsVisibleError,
}: UseMutationProps) => {
  const navigation = useRootNavigation()

  const handleComplete = (data: CreateTaskMutationResult) => {
    navigation.navigate(Routes.Task, {
      taskId: data.createTask._id,
    })
  }

  const handleError = (error: ApolloError) => {
    setIsVisibleError(true)
    setErrorMessage(error.message)
  }

  return useMutation<CreateTaskMutationResult, CreateTaskMutationVariables>(
    createTaskMutation,
    {
      onCompleted: handleComplete,
      onError: handleError,
    },
  )
}

export const useUpdateTaskMutation = ({
  setErrorMessage,
  setIsVisibleError,
}: UseMutationProps) => {
  const navigation = useRootNavigation()

  const handleComplete = (data: UpdateTaskMutationResult) => {
    navigation.navigate(Routes.Task, {
      taskId: data.updateTask._id,
    })
  }

  const handleError = (error: ApolloError) => {
    setIsVisibleError(true)
    setErrorMessage(error.message)
  }

  return useMutation<UpdateTaskMutationResult, UpdateTaskMutationVariables>(
    updateTaskMutation,
    {
      onCompleted: handleComplete,
      onError: handleError,
    },
  )
}
