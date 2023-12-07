import { useEffect, useState } from 'react'
import { getItemAsync } from 'expo-secure-store'
import {
  AuthActions,
  useAuthDispatch,
  useAuthState,
} from '@mobile/auth-provider'
import { useApiState } from '@mobile/api-provider'

export const useGetCurrentGroup = () => {
  const { apiUri, isLoading: isLoadingApi } = useApiState()
  const { userToken, isLoading: isLoadingUser } = useAuthState()
  const dispatchAuth = useAuthDispatch()
  const [withApi, setWithApi] = useState<boolean>(false)
  const isLogin = Boolean(userToken)
  const isLoading = isLoadingApi || isLoadingUser

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = ''

      try {
        userToken = (await getItemAsync('userToken')) as string
      } catch (e) {
        dispatchAuth({ type: AuthActions.SignOut })
      }

      userToken &&
        dispatchAuth({ type: AuthActions.RestoreToken, token: userToken })
    }

    void bootstrapAsync()
  }, [dispatchAuth])

  useEffect(() => {
    setWithApi(Boolean(apiUri))
  }, [apiUri])

  return {
    withApi,
    isLogin,
    isLoading,
  }
}
