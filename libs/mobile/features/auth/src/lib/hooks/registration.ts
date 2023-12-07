import { useMutation } from '@apollo/client'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'
import { registrationMutation } from '@shared/queries'

import type { ApolloError } from '@apollo/client'
import type {
  RegistrationMutationResult,
  RegistrationMutationVariables,
} from '@shared/models'
import type { UseMutationProps } from '../types'

export const useRegistrationMutation = ({
  setErrorMessage,
  setIsVisibleError,
}: UseMutationProps) => {
  const dispatch = useAuthDispatch()

  const handleSuccess = (data: RegistrationMutationResult) => {
    dispatch({ type: AuthActions.SignIn, token: data.registration.token })
  }

  const handleError = (error: ApolloError) => {
    setIsVisibleError(true)
    setErrorMessage(error.message)
  }

  return useMutation<RegistrationMutationResult, RegistrationMutationVariables>(
    registrationMutation,
    {
      onCompleted: handleSuccess,
      onError: handleError,
    },
  )
}
