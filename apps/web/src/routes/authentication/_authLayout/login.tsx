import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@pages'

export const Route = createFileRoute('/authentication/_authLayout/login')({
  component: LoginPage,
})
