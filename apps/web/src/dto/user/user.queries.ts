import { useQuery } from '@tanstack/react-query'
import { userEndpoints } from '@shared/api'
import { httpClient } from '@config'

import type { UserProfile } from '@shared/types'

const httpUserProfile = (): Promise<UserProfile> =>
  httpClient.get(userEndpoints.profile).then((response) => response.data)

export const useProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['user', 'profile'],
    queryFn: httpUserProfile,
    retry: false,
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: true,
  })
}
