import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/authentication/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: Outlet,
})
