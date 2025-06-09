import { z } from 'zod'

import type { UserProfile } from './user'

export type BoardResponse = {
  id: string
  name: string
  description?: string
  owner: UserProfile
}

export const createBoardSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
})

export type CreateBoardRequest = z.infer<typeof createBoardSchema>

export type UpdateBoardRequest = Partial<CreateBoardRequest>

export type ProjectBoard = {
  id: string
  name: string
}
