import { useContext } from 'react'

import { ApiDispatchContext } from '../context'

export const useApiDispatch = () => {
  const context = useContext(ApiDispatchContext)

  if (context === undefined) {
    throw new Error('useApiDispatch must be used within a ApiProvider')
  }

  return context
}
