import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { AuthLayout } from '@components'
import { z } from 'zod'

export const Route = createFileRoute('/authentication/_authLayout')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    const { isAuthenticated } = context.auth

    if (isAuthenticated) {
      throw redirect({
        to: search.redirect || '/dashboard',
      })
    }
  },
  component: () => {
    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    )
  },
})
