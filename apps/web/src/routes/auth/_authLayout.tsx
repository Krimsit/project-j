import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_authLayout')({
  component: () => {
    return (
      <div>
        Auth layout
        <Outlet />
      </div>
    )
  },
})
