import { useQuery } from '@apollo/client'
import { currentUserQuery, getAllUsersQuery } from '@shared/queries'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'

import type {
  CurrentUserQueryResult,
  GetAllUsersQueryResult,
} from '@shared/queries'

export const useUserQuery = () => {
  const dispatch = useAuthDispatch()

  return useQuery<CurrentUserQueryResult>(currentUserQuery, {
    onError() {
      dispatch({ type: AuthActions.SignOut })
    },
  })
}

export const useAllUsersQuery = () =>
  useQuery<GetAllUsersQueryResult>(getAllUsersQuery)
