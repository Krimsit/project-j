import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@apollo/client'
import {
  getTaskCommentsQuery,
  createTaskCommentMutation,
} from '@shared/queries'

import type {
  GetTaskCommentsQueryResult,
  GetTaskCommentsQueryVariables,
  CreateTaskCommentMutationResult,
  CreateTaskCommentMutationVariables,
} from '@shared/models'
import type { TaskRouterProps } from '../types'

export const useTaskComments = () => {
  const router = useRoute<TaskRouterProps>()
  const id = router.params.taskId

  return useQuery<GetTaskCommentsQueryResult, GetTaskCommentsQueryVariables>(
    getTaskCommentsQuery,
    {
      variables: {
        value: id,
      },
    },
  )
}

export const useCreateTaskComment = () => {
  const router = useRoute<TaskRouterProps>()
  const { refetch } = useTaskComments()
  const id = router.params.taskId

  const handleComplete = () => {
    void refetch({ value: id })
  }

  return useMutation<
    CreateTaskCommentMutationResult,
    CreateTaskCommentMutationVariables
  >(createTaskCommentMutation, {
    onCompleted: handleComplete,
  })
}
