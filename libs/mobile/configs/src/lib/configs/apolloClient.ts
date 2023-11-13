import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'
const { manifest } = Constants
const host = `http://${manifest?.debuggerHost?.split(`:`).shift()}:3000`

export const apolloClient = new ApolloClient({
  uri: `${host}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})
