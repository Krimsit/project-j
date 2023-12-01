import type { UploadFileProps } from './common'

export type ProjectForm = {
  image: UploadFileProps
  name: string
  users: string[]
}

export type UpdateProjectUsersForm = {
  project_id: string
  users: string[]
}
