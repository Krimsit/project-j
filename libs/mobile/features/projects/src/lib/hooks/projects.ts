import { useQuery } from '@apollo/client'
import { getUserProjectsQuery } from '@shared/queries'

import type { GetUserProjectsQueryResult } from '@shared/models'

export const useUserProjectsQuery = () =>
  useQuery<GetUserProjectsQueryResult>(getUserProjectsQuery)
