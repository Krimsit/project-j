import { gql } from '@apollo/client'

export type IsValidSecretKeyMutationResult = {
  isValidSecretKey: boolean
}

export type IsValidSecretKeyMutationVariables = {
  value: string
}

export const isValidSecretKeyMutation = gql`
  mutation isValidSecretKeyMutation($value: String!) {
    isValidSecretKey(apiKey: $value)
  }
`
