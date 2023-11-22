import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'
const { expoConfig } = Constants
const host = `http://${expoConfig?.hostUri?.split(`:`).shift()}:3000`

export const apolloClient = new ApolloClient({
  uri: `${host}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})
