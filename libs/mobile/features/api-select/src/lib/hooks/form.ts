import { useMemo } from 'react'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  useMutation,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getItemAsync } from 'expo-secure-store'
import { ApiActions, useApiDispatch } from '@mobile/api-provider'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'
import { isValidSecretKeyMutation } from '@shared/queries'

import type {
  IsValidSecretKeyMutationResult,
  IsValidSecretKeyMutationVariables,
} from '@shared/models'

export const useIsValidSecretKeyMutation = (uri: string) => {
  const navigation = useRootNavigation()
  const dispatch = useApiDispatch()
  const apolloClient = useMemo(() => {
    const httpLink = createHttpLink({
      uri: `${uri}/graphql`,
    })
    const authLink = setContext(async (_, { headers }) => {
      const token = (await getItemAsync('userToken')) as string

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        } as unknown,
      }
    })

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }, [uri])

  const handleError = () => {
    dispatch({ type: ApiActions.Delete })
    navigation.navigate(Routes.ApiSelect)
  }

  const handleSuccess = () => {
    dispatch({ type: ApiActions.Set, uri })
  }

  return useMutation<
    IsValidSecretKeyMutationResult,
    IsValidSecretKeyMutationVariables
  >(isValidSecretKeyMutation, {
    onCompleted: handleSuccess,
    onError: handleError,
    client: apolloClient,
  })
}
