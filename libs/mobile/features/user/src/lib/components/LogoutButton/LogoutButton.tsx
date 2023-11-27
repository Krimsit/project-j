import { Button } from 'react-native-paper'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'

import type { FC } from 'react'

export const LogoutButton: FC = () => {
  const dispatch = useAuthDispatch()
  const handleLogout = () => dispatch({ type: AuthActions.SignOut })

  return (
    <Button icon={'logout'} mode={'outlined'} onPress={handleLogout}>
      Logout
    </Button>
  )
}
