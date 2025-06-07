import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '@pages'

export const Route = createFileRoute('/_auth/dashboard/_dashboardLayout/')({
  component: DashboardPage,
})
