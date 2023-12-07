import { useApolloClient, useQuery } from '@apollo/client'
import { currentUserQuery, getAllUsersQuery } from '@shared/queries'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'

import type {
  CurrentUserQueryResult,
  GetAllUsersQueryResult,
} from '@shared/models'

export const useUserQuery = () => {
  const client = useApolloClient()
  const dispatch = useAuthDispatch()

  return useQuery<CurrentUserQueryResult>(currentUserQuery, {
    onError() {
      void client.resetStore()
      dispatch({ type: AuthActions.SignOut })
    },
    fetchPolicy: 'network-only',
  })
}

export const useAllUsersQuery = () =>
  useQuery<GetAllUsersQueryResult>(getAllUsersQuery)
