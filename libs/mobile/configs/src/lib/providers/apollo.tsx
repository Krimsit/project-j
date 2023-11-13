import { ApolloProvider } from '@apollo/client'

import { apolloClient } from '../configs'

import type { ReactNode } from 'react'

// eslint-disable-next-line react/display-name
export const withApollo = (component: () => ReactNode) => () => (
  <ApolloProvider client={apolloClient}>{component()}</ApolloProvider>
)
