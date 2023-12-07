import type { Document } from 'mongoose'
import type { Task } from '@api/models'

export type TaskDocument = Document & Task
