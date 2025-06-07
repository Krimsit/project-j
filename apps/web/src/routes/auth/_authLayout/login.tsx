import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_authLayout/login')({
  component: () => {
    return <div>Login</div>
  },
})
