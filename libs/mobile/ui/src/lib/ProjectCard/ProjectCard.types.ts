import type { Project } from '@shared/models'

export type ProjectCardProps = Omit<Project, 'users'> & {
  completedTaskCount: number
  allTaskCount: number
}
