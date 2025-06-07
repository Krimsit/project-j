import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AuthLayout } from '@components'

export const Route = createFileRoute('/authentication/_authLayout')({
  component: () => {
    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    )
  },
})
