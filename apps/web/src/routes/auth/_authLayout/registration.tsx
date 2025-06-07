import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_authLayout/registration')({
  component: () => {
    return <div>Registration</div>
  },
})
