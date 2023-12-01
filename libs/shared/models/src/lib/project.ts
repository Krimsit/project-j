import type { User } from './user'

export type Project = {
  _id: string
  image: string
  name: string
  users: User[]
  owner: User
  createdAt: string
}
