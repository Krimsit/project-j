import { SchemaFactory } from '@nestjs/mongoose'
import { User } from '@shared/models'

export const UserSchema = SchemaFactory.createForClass(User)
