import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboardLayout')({
  component: () => {
    return (
      <div>
        Dashboard layout
        <Outlet />
      </div>
    )
  },
})
