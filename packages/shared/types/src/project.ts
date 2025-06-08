import { z } from 'zod'

import type { UserProfile } from './user'

export type ProjectResponse = {
  id: string
  name: string
  description?: string
  gradient: string
  cover?: string
  owner: UserProfile
}

export const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  cover: z.string().optional(),
})

export type CreateProjectRequest = z.infer<typeof createProjectSchema>

export type UpdateProjectRequest = Partial<CreateProjectRequest>

export type MyProject = {
  id: string
  name: string
  gradient: string
}
