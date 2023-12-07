import { useEffect, useMemo, useState } from 'react'
import { getItemAsync } from 'expo-secure-store'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { ApiActions, useApiDispatch, useApiState } from '@mobile/api-provider'

import { authLink } from '../constants'

import type { NormalizedCacheObject } from '@apollo/client'

export const useSetApi = (): ApolloClient<NormalizedCacheObject> => {
  const dispatch = useApiDispatch()
  const { apiUri } = useApiState()
  const [uri, setUri] = useState('')
  const apolloClient = useMemo(() => {
    const httpLink = createHttpLink({
      uri: `${uri}/graphql`,
    })

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }, [uri])

  useEffect(() => {
    const bootstrapAsync = async () => {
      const defaultApiUri = (await getItemAsync('api_uri')) ?? ''

      setUri(defaultApiUri)
      dispatch({ type: ApiActions.Set, uri: defaultApiUri })
    }

    void bootstrapAsync()
  }, [dispatch])

  useEffect(() => {
    setUri(apiUri)
  }, [apiUri])

  return apolloClient
}
