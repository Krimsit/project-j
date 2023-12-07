import { ApolloProvider } from '@apollo/client'

import { useSetApi } from '../hooks'

import type { ReactNode } from 'react'

// eslint-disable-next-line react/display-name
export const withApollo = (component: () => ReactNode) => () => {
  const apolloClient = useSetApi()

  return <ApolloProvider client={apolloClient}>{component()}</ApolloProvider>
}
