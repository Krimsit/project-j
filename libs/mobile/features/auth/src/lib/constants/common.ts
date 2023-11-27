import type { LoginForm, RegistrationForm } from '../types'

export const defaultLoginFormValues: LoginForm = {
  email: '',
  password: '',
}

export const defaultRegistrationFormValues: RegistrationForm = {
  email: '',
  username: '',
  first_name: '',
  last_name: '',
  password: '',
}
