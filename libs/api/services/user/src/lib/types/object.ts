import type { Document } from 'mongoose'
import type { User } from '@api/models'

export type UserDocument = Document & User
