import { useContext } from 'react'

import { ApiStateContext } from '../context'

export const useApiState = () => {
  const context = useContext(ApiStateContext)

  if (context === undefined) {
    throw new Error('useApiState must be used within a ApiProvider')
  }

  return context
}
