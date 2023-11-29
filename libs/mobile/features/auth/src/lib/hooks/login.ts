import { useMutation } from '@apollo/client'
import { loginMutation } from '@shared/queries'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'

import type { ApolloError } from '@apollo/client'
import type {
  LoginMutationResult,
  LoginMutationVariables,
} from '@shared/queries'
import type { UseMutationProps } from '../types'

export const useLoginMutation = ({
  setErrorMessage,
  setIsVisibleError,
}: UseMutationProps) => {
  const dispatch = useAuthDispatch()

  const handleSuccess = (data: LoginMutationResult) => {
    dispatch({ type: AuthActions.SignIn, token: data.login.token })
  }

  const handleError = (error: ApolloError) => {
    setIsVisibleError(true)
    setErrorMessage(error.message)
  }

  return useMutation<LoginMutationResult, LoginMutationVariables>(
    loginMutation,
    {
      onCompleted: handleSuccess,
      onError: handleError,
    },
  )
}
