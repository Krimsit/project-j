import { setItemAsync } from 'expo-secure-store'

import { AuthActions } from '../types'

import type { AuthAction, AuthData } from '../types'

export const authReducer = (state: AuthData, action: AuthAction) => {
  switch (action.type) {
    case AuthActions.RestoreToken:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      }
    case AuthActions.SignIn:
      void setItemAsync('userToken', action.token)

      return {
        ...state,
        userToken: action.token,
        isSignOut: false,
      }
    case AuthActions.SignOut:
      return {
        ...state,
        isSignOut: true,
        userToken: '',
      }
    default:
      return state
  }
}
