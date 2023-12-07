import { useContext } from 'react'

import { AuthDispatchContext } from '../context'

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext)

  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }

  return context
}
