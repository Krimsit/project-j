import { z } from 'zod'

export const registrationRequestScheme = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  username: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  midName: z.string().optional(),
  avatar: z.string().optional(),
})

export type RegistrationRequest = z.infer<typeof registrationRequestScheme>

export const loginRequestScheme = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

export type LoginRequest = z.infer<typeof loginRequestScheme>

export type LoginResponse = {
  accessToken: string
}
