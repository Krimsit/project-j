import { setItemAsync, deleteItemAsync } from 'expo-secure-store'

import { AuthActions } from '../types'

import type { AuthAction, AuthData } from '../types'

export const authReducer = (state: AuthData, action: AuthAction) => {
  switch (action.type) {
    case AuthActions.RestoreToken:
      void setItemAsync('userToken', action.token)

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
      void deleteItemAsync('userToken')

      return {
        ...state,
        isSignOut: true,
        userToken: '',
      }
    default:
      return state
  }
}
