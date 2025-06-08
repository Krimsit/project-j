import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FileDocument = File & Document

@Schema({ timestamps: true })
export class File {
  @Prop({ type: String, required: true })
  filename!: string

  @Prop({ type: String, required: true })
  originalName!: string

  @Prop({ type: String, required: true })
  size!: number

  @Prop({ type: String, required: true })
  mimeType!: string

  @Prop({ type: String, required: true })
  s3Key!: string

  @Prop({ type: String, required: true })
  url!: string

  @Prop({ type: String, default: null })
  markedForDeletionAt!: Date | null
}

export const FileSchema = SchemaFactory.createForClass(File)
