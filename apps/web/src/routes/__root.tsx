import { Fragment } from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import type { QueryClient } from '@tanstack/react-query'
import type { AuthContextProps } from '@context'

function RootComponent() {
  return (
    <Fragment>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </Fragment>
  )
}

type RouteContext = {
  queryClient: QueryClient
  auth: AuthContextProps
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
})
