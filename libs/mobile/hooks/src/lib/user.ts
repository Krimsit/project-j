import { useQuery } from '@apollo/client'
import { currentUserQuery } from '@shared/queries'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'

import type { CurrentUserQueryResult } from '@shared/queries'

export const useUserQuery = () => {
  const dispath = useAuthDispatch()

  return useQuery<CurrentUserQueryResult>(currentUserQuery, {
    onError() {
      dispath({ type: AuthActions.SignOut })
    },
  })
}
