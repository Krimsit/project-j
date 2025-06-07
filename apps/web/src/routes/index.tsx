import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    const { isAuthenticated } = context.auth

    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      })
    }

    throw redirect({
      to: '/authentication/login',
    })
  },
  component: () => <div />,
})
