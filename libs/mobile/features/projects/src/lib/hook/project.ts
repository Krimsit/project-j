import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@apollo/client'
import {
  getProjectQuery,
  updateProjectUsersMutations,
  deleteProjectMutation,
} from '@shared/queries'
import { Routes } from '@mobile/models'

import type {
  GetProjectQueryResult,
  GetProjectQueryVariables,
  UpdateProjectUserMutationResult,
  UpdateProjectUsersMutationVariables,
  DeleteProjectMutationResult,
  DeleteProjectMutationVariables,
} from '@shared/queries'
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
