import { Field, InputType } from '@nestjs/graphql'

import type { Schema as MongooseSchema } from 'mongoose'
import type { UploadFileProps } from '@shared/models'
import type { ProjectFormClass, UpdateProjectUsersFormClass } from '../types'

@InputType()
class ProjectUploadFile implements UploadFileProps {
  @Field(() => String)
  base64!: string

  @Field(() => String)
  filename!: string
}

@InputType()
export class ProjectForm implements ProjectFormClass {
  @Field(() => ProjectUploadFile)
  image!: ProjectUploadFile

  @Field(() => String)
  name!: string

  @Field(() => [String])
  users!: MongooseSchema.Types.ObjectId[]
}

@InputType()
export class UpdateProjectUsersForm implements UpdateProjectUsersFormClass {
  @Field(() => [String])
  users!: MongooseSchema.Types.ObjectId[]
}
