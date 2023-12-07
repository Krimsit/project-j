import { createContext, useReducer } from 'react'

import { apiReducer } from '../reducers'
import { defaultApiData } from '../constants'

import type { FC, PropsWithChildren } from 'react'
import type { ApiData, ApiAction } from '../types'

export const ApiStateContext = createContext<ApiData>(defaultApiData)

export const ApiDispatchContext = createContext<(d: ApiAction) => void>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
)

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
