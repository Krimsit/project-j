import { createFileRoute, Outlet } from '@tanstack/react-router'
import { DashboardLayout } from '@components'

export const Route = createFileRoute('/_auth/dashboard/_dashboardLayout')({
  component: () => {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    )
  },
})
