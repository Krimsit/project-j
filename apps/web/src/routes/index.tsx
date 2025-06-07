import { createFileRoute } from '@tanstack/react-router'

import { testQuery } from '../dto/test'
import { RootPage } from '../pages'

export const Route = createFileRoute('/')({
  component: RootPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(testQuery),
})
