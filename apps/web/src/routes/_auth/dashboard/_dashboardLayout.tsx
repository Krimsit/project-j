import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'
import { DashboardLayout } from '@components'

export const Route = createFileRoute('/_auth/dashboard/_dashboardLayout')({
  validateSearch: z.object({
    taskId: z.string().optional().catch(''),
  }),
  component: () => {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    )
  },
})
