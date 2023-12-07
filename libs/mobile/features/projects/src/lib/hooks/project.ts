import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@apollo/client'
import { Routes } from '@mobile/models'
import {
  getProjectQuery,
  updateProjectUsersMutations,
  deleteProjectMutation,
  getProjectTasksQuery,
} from '@shared/queries'

import type {
  GetProjectQueryResult,
  GetProjectQueryVariables,
  UpdateProjectUserMutationResult,
  UpdateProjectUsersMutationVariables,
  DeleteProjectMutationResult,
  DeleteProjectMutationVariables,
  GetProjectTasksQueryResult,
  GetProjectTasksQueryVariables,
} from '@shared/models'
import type { ProjectRouterProps, UseDeleteProjectMutation } from '../types'

export const useProjectQuery = () => {
  const router = useRoute<ProjectRouterProps>()
  const id = router.params.projectId

  return useQuery<GetProjectQueryResult, GetProjectQueryVariables>(
    getProjectQuery,
    {
      variables: {
        value: id,
      },
    },
  )
}

export const useProjectTasksQuery = () => {
  const router = useRoute<ProjectRouterProps>()
  const id = router.params.projectId

  return useQuery<GetProjectTasksQueryResult, GetProjectTasksQueryVariables>(
    getProjectTasksQuery,
    {
      variables: {
        value: id,
      },
    },
  )
}

export const useUpdateProjectUsersMutation = () =>
  useMutation<
    UpdateProjectUserMutationResult,
    UpdateProjectUsersMutationVariables
  >(updateProjectUsersMutations)

export const useDeleteProjectMutation = ({
  navigation,
}: UseDeleteProjectMutation) => {
  const handleComplete = () => {
    navigation.navigate(Routes.Projects, {
      screen: Routes.Projects,
    })
  }

  return useMutation<
    DeleteProjectMutationResult,
    DeleteProjectMutationVariables
  >(deleteProjectMutation, {
    onCompleted: handleComplete,
  })
}
