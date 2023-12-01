import { Field, InputType } from '@nestjs/graphql'

import type { Schema as MongooseSchema } from 'mongoose'
import type {
  ProjectForm as ProjectFormType,
  UploadFileProps,
  UpdateProjectUsersForm as UpdateUsersFormType,
} from '@shared/models'

type ProjectFormClass = Omit<ProjectFormType, 'users'> & {
  users: MongooseSchema.Types.ObjectId[]
}

type UpdateProjectUsersFormClass = Omit<UpdateUsersFormType, 'users'> & {
  users: MongooseSchema.Types.ObjectId[]
}

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
  @Field(() => String)
  project_id!: string

  @Field(() => [String])
  users!: MongooseSchema.Types.ObjectId[]
}
