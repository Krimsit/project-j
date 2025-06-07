import { createFileRoute } from '@tanstack/react-router'
import { RegistrationPage } from '@pages'

export const Route = createFileRoute(
  '/authentication/_authLayout/registration',
)({
  component: RegistrationPage,
})
