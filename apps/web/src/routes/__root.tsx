import { Fragment } from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import type { QueryClient } from '@tanstack/react-query'

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
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
})
