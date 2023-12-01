import type { UploadFileProps } from './common'

export type RegistrationForm = {
  avatar: UploadFileProps
  email: string
  username: string
  first_name: string
  last_name: string
  password: string
}
