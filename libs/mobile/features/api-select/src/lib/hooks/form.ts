import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  useMutation,
} from '@apollo/client'
import { isValidSecretKeyMutation } from '@shared/queries'
import { ApiActions, useApiDispatch } from '@mobile/api-provider'
import { useMemo } from 'react'
import { setContext } from '@apollo/client/link/context'
import { getItemAsync } from 'expo-secure-store'

import type {
  IsValidSecretKeyMutationResult,
  IsValidSecretKeyMutationVariables,
} from '@shared/queries'

export const useIsValidSecretKeyMutation = (uri: string) => {
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
