import { AuthProvider } from '@mobile/auth-provider'

import type { ReactNode } from 'react'

// eslint-disable-next-line react/display-name
export const withAuth = (component: () => ReactNode) => () => (
  <AuthProvider>{component()}</AuthProvider>
)
