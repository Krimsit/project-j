import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { AuthProvider, useAuthContext } from '@context'
import { queryClient } from '@config'

import { routeTree } from './routeTree.gen'
import './styles/global.css'

import type { FC } from 'react'
import type { AuthContextProps } from '@context'

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: {} as AuthContextProps,
  },
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const InnerApp: FC = () => {
  const auth = useAuthContext()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <MantineProvider defaultColorScheme={'dark'}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
)
