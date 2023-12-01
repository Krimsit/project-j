import type { ProjectForm } from '@shared/models'

export type TextFieldProps = {
  name: keyof Omit<ProjectForm, 'image' | 'users'>
  label: string
}
