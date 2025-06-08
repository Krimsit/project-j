import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { User } from './user.model'
import { File } from './file.model'

import type { UserDocument } from './user.model'
import type { FileDocument } from './file.model'

export type ProjectDocument = Project & Document

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: String, required: true })
  name!: string

  @Prop({ type: String, required: false })
  description?: string

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner!: UserDocument

  @Prop({ type: String, required: true })
  gradient!: string

  @Prop({ type: Types.ObjectId, ref: File.name, required: false })
  cover?: FileDocument
}

export const ProjectSchema = SchemaFactory.createForClass(Project)
