import { gql } from '@apollo/client'

export const isValidSecretKeyMutation = gql`
  mutation isValidSecretKeyMutation($value: String!) {
    isValidSecretKey(apiKey: $value)
  }
`
