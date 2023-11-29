import { Field, InputType, ObjectType } from '@nestjs/graphql'

import type {
  LoginForm as LoginFormType,
  RegistrationForm as RegistrationFormType,
  UploadFileProps,
} from '@shared/models'

@InputType()
export class LoginForm implements LoginFormType {
  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}

@InputType()
class UploadFile implements UploadFileProps {
  @Field(() => String)
  base64!: string

  @Field(() => String)
  filename!: string
}

@InputType()
export class RegistrationForm implements RegistrationFormType {
  @Field(() => String)
  email!: string

  @Field(() => String)
  username!: string

  @Field(() => String)
  first_name!: string

  @Field(() => String)
  last_name!: string

  @Field(() => String)
  password!: string

  @Field(() => UploadFile)
  avatar!: UploadFile
}
