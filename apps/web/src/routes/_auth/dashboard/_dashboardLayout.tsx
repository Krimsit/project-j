import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/_dashboardLayout')({
  component: () => {
    return (
      <div>
        Dashboard layout
        <Outlet />
      </div>
    )
  },
})
