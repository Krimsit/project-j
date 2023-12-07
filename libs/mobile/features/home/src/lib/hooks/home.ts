import { useQuery } from '@apollo/client'
import { getUserProjectsQuery, getUserTasksQuery } from '@shared/queries'

import type {
  GetUserTasksQueryResult,
  GetUserProjectsQueryResult,
} from '@shared/models'

export const useUserTasksQuery = () =>
  useQuery<GetUserTasksQueryResult>(getUserTasksQuery)

export const useUserProjectsQuery = () =>
  useQuery<GetUserProjectsQueryResult>(getUserProjectsQuery)
