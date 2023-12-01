import { gql } from '@apollo/client'

import type { User, LoginForm, RegistrationForm } from '@shared/models'

export type RegistrationMutationResult = {
  registration: {
    user: User
    token: string
  }
}

export type RegistrationMutationVariables = {
  value: RegistrationForm
}

export const registrationMutation = gql`
  mutation registrationMutation($value: RegistrationForm!) {
    registration(data: $value) {
      user {
        email
        username
        last_name
        first_name
        createdAt
        avatar
      }
      token
    }
  }
`

export type LoginMutationResult = {
  login: {
    user: User
    token: string
  }
}

export type LoginMutationVariables = {
  value: LoginForm
}

export const loginMutation = gql`
  mutation loginMutation($value: LoginForm!) {
    login(data: $value) {
      user {
        email
        username
        last_name
        first_name
        createdAt
      }
      token
    }
  }
`

export type RefreshTokenQueryResult = {
  refreshToken: string
}

export const refreshTokenQuery = gql`
  query refreshTokenQuery {
    refreshToken
  }
`

export type CurrentUserQueryResult = {
  currentUser: User
}

export const currentUserQuery = gql`
  query currentUserQuery {
    currentUser {
      _id
      username
      last_name
      first_name
      createdAt
      avatar
    }
  }
`

export type GetAllUsersQueryResult = {
  getAllUsers: User[]
}

export const getAllUsersQuery = gql`
  query getAllUsersQuery {
    getAllUsers {
      _id
      username
      last_name
      first_name
      createdAt
      avatar
    }
  }
`

export type DeleteUserMutationResult = {
  deleteUser: string
}

export const deleteUserMutation = gql`
  mutation deleteUserMutation {
    deleteUser
  }
`
