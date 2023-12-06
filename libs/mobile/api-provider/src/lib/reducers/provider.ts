import { setItemAsync, deleteItemAsync } from 'expo-secure-store'

import { ApiActions } from '../types'

import type { ApiAction, ApiData } from '../types'

export const apiReducer = (state: ApiData, action: ApiAction) => {
  switch (action.type) {
    case ApiActions.Set: {
      void setItemAsync('api_uri', action.uri)

      return {
        ...state,
        apiUri: action.uri,
        isLoading: false,
      }
    }
    case ApiActions.Delete: {
      void deleteItemAsync('api_uri')

      return {
        ...state,
        apiUri: '',
        isLoading: false,
      }
    }
    default:
      return state
  }
}
