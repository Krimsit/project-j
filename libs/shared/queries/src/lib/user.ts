import { gql } from '@apollo/client'

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

export const deleteUserMutation = gql`
  mutation deleteUserMutation {
    deleteUser
  }
`
