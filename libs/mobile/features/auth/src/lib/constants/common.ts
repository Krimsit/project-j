import type { RegistrationForm, LoginForm } from '@shared/models'

export const defaultLoginFormValues: LoginForm = {
  email: '',
  password: '',
}

export const defaultRegistrationFormValues: RegistrationForm = {
  avatar: {
    base64: '',
    filename: '',
  },
  email: '',
  username: '',
  first_name: '',
  last_name: '',
  password: '',
}
