import type { Schema as MongooseSchema } from 'mongoose'

export type User = {
  _id: MongooseSchema.Types.ObjectId
  email: string
  username: string
  password: string
  createdAt: string
}
