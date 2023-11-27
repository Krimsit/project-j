import { createContext, useReducer, useContext } from 'react'

import { authReducer } from '../reducers'
import { defaultAuthData } from '../constants'

import type { FC, PropsWithChildren } from 'react'
import type { AuthData, AuthAction } from '../types'

const AuthStateContext = createContext<AuthData>(defaultAuthData)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const AuthDispatchContext = createContext<(d: AuthAction) => void>(() => {})

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

export const useAuthState = () => {
  const context = useContext(AuthStateContext)

  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }

  return context
}

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext)

  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }

  return context
}
