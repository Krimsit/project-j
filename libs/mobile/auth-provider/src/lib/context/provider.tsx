import { createContext, useReducer } from 'react'

import { authReducer } from '../reducers'
import { defaultAuthData } from '../constants'

import type { FC, PropsWithChildren } from 'react'
import type { AuthData, AuthAction } from '../types'

export const AuthStateContext = createContext<AuthData>(defaultAuthData)

export const AuthDispatchContext = createContext<(d: AuthAction) => void>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, defaultAuthData)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
