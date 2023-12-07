import { useContext } from 'react'

import { AuthStateContext } from '../context'

export const useAuthState = () => {
  const context = useContext(AuthStateContext)

  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }

  return context
}
