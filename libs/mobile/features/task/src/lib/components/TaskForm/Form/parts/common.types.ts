import type { ReactNode } from 'react'
import type { TaskForm } from '@shared/models'

export type RowProps = {
  title: string
  children: ReactNode
}

export type TextFieldProps = {
  name: keyof Omit<
    TaskForm,
    'assigner' | 'attachments' | 'dueData' | 'priority' | 'project_id'
  >
  placeholder?: string
  label: string
}
