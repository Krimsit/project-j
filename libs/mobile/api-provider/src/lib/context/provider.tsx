import { createContext, useReducer, useContext } from 'react'

import { apiReducer } from '../reducers'
import { defaultApiData } from '../constants'

import type { FC, PropsWithChildren } from 'react'
import type { ApiData, ApiAction } from '../types'

const ApiStateContext = createContext<ApiData>(defaultApiData)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ApiDispatchContext = createContext<(d: ApiAction) => void>(() => {})

export const ApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, defaultApiData)

  return (
    <ApiStateContext.Provider value={state}>
      <ApiDispatchContext.Provider value={dispatch}>
        {children}
      </ApiDispatchContext.Provider>
    </ApiStateContext.Provider>
  )
}

export const useApiState = () => {
  const context = useContext(ApiStateContext)

  if (context === undefined) {
    throw new Error('useApiState must be used within a ApiProvider')
  }

  return context
}

export const useApiDispatch = () => {
  const context = useContext(ApiDispatchContext)

  if (context === undefined) {
    throw new Error('useApiDispatch must be used within a ApiProvider')
  }

  return context
}
