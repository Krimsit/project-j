import type { UploadFileProps } from './commo'

export type RegistrationForm = {
  avatar: UploadFileProps
  email: string
  username: string
  first_name: string
  last_name: string
  password: string
}
