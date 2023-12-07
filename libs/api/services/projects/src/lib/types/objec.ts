import type { Document } from 'mongoose'
import type { Project } from '@api/models'

export type ProjectDocument = Document & Project
