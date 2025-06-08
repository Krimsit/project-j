import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, location, search }) => {
    const { isAuthenticated } = context.auth

    if (isAuthenticated) {
      throw redirect({
        to: search.redirect || '/dashboard',
      })
    }

    throw redirect({
      to: '/authentication/login',
      search: {
        redirect: location.hash,
      },
    })
  },
  component: () => <div />,
})
