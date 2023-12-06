import { useEffect, useMemo, useState } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getItemAsync } from 'expo-secure-store'
import { ApiActions, useApiDispatch, useApiState } from '@mobile/api-provider'

import type { ReactNode } from 'react'

const authLink = setContext(async (_, { headers }) => {
  const token = (await getItemAsync('userToken')) ?? ''

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    } as unknown,
  }
})

// eslint-disable-next-line react/display-name
export const withApollo = (component: () => ReactNode) => () => {
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

  return <ApolloProvider client={apolloClient}>{component()}</ApolloProvider>
}
