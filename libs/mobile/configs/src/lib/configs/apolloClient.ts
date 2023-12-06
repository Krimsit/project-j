import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'
import { getItemAsync } from 'expo-secure-store'
const { expoConfig } = Constants
const host = `http://${expoConfig?.hostUri?.split(`:`).shift()}:3000`
const httpLink = createHttpLink({
  uri: `${host}/graphql`,
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

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
