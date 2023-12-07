import { getItemAsync } from 'expo-secure-store'
import { setContext } from '@apollo/client/link/context'

export const authLink = setContext(async (_, { headers }) => {
  const token = (await getItemAsync('userToken')) ?? ''

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    } as unknown,
  }
})
