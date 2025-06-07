import { queryOptions } from '@tanstack/react-query'

import { httpClient } from '../../config'

import type { TestResponse } from '@shared/types'

const httpTestQuery = (): Promise<TestResponse> =>
  httpClient.get('/test').then((response) => response.data)

export const testQuery = queryOptions<TestResponse>({
  queryKey: ['test'],
  queryFn: httpTestQuery,
})
