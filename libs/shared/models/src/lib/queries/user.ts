import type { User } from '../user'
import type { RegistrationForm, LoginForm } from '../forms'

export type RegistrationMutationResult = {
  registration: {
    user: User
    token: string
  }
}

export type RegistrationMutationVariables = {
  value: RegistrationForm
}

export type LoginMutationResult = {
  login: {
    user: User
    token: string
  }
}

export type LoginMutationVariables = {
  value: LoginForm
}

export type CurrentUserQueryResult = {
  currentUser: User
}

export type GetAllUsersQueryResult = {
  getAllUsers: User[]
}

export type DeleteUserMutationResult = {
  deleteUser: string
}
