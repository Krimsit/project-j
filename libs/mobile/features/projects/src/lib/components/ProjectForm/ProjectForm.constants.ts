import type { ProjectForm } from '@shared/models'

export const defaultFormValues: ProjectForm = {
  name: '',
  image: {
    base64: '',
    filename: '',
  },
  users: [],
}
