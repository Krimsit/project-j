import { useMutation } from '@apollo/client'
import { useRootNavigation } from '@mobile/hooks'
import { createProjectMutation, updateProjectMutation } from '@shared/queries'
import { Routes } from '@mobile/models'

import type { ApolloError } from '@apollo/client'
import type {
  CreateProjectMutationResult,
  CreateProjectMutationVariables,
  UpdateProjectMutationResult,
  UpdateProjectMutationVariables,
} from '@shared/queries'
import type { UseMutationProps } from '../types'

export const useCreateProjectMutation = ({
  setErrorMessage,
  setIsVisibleError,
}: UseMutationProps) => {
  const navigation = useRootNavigation()

  const handleComplete = (data: CreateProjectMutationResult) => {
    navigation.navigate(Routes.Project, {
      projectId: data.createProject._id,
    })
  }

  const handleError = (error: ApolloError) => {
    setIsVisibleError(true)
    setErrorMessage(error.message)
  }

  return useMutation<
    CreateProjectMutationResult,
    CreateProjectMutationVariables
  >(createProjectMutation, {
    onCompleted: handleComplete,
    onError: handleError,
  })
}

export const useUpdateProjectMutation = ({
  setErrorMessage,
  setIsVisibleError,
}: UseMutationProps) => {
  const navigation = useRootNavigation()

  const handleComplete = (data: UpdateProjectMutationResult) => {
    navigation.navigate(Routes.Project, {
      projectId: data.updateProject._id,
    })
  }

  const handleError = (error: ApolloError) => {
    setIsVisibleError(true)
    setErrorMessage(error.message)
  }

  return useMutation<
    UpdateProjectMutationResult,
    UpdateProjectMutationVariables
  >(updateProjectMutation, {
    onCompleted: handleComplete,
    onError: handleError,
  })
}
