import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { authEndpoints } from '@shared/api'
import { httpClient } from '@config'
import { useAuthContext } from '@context'

import type {
  LoginRequest,
  RegistrationRequest,
  LoginResponse,
} from '@shared/types'

const httpLogin = (data: LoginRequest): Promise<LoginResponse> =>
  httpClient.post(authEndpoints.login, data).then((response) => response.data)

export const useLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuthContext()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ['login'],
    mutationFn: httpLogin,
    onSuccess: async (data) => {
      await login(data.accessToken)
      await navigate({
        from: '/authentication/login',
        to: '/',
      })
    },
  })
}

const httpGoogleLogin = (idToken: string): Promise<LoginResponse> =>
  httpClient
    .post(authEndpoints.loginGoogle, {
      idToken,
    })
    .then((response) => response.data)

export const useGoogleLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuthContext()

  return useMutation<LoginResponse, Error, string>({
    mutationKey: ['login', 'google'],
    mutationFn: httpGoogleLogin,
    onSuccess: async (data) => {
      await login(data.accessToken)
      await navigate({
        from: '/authentication/login',
        to: '/',
      })
    },
  })
}

const httpRegistration = (data: RegistrationRequest): Promise<LoginResponse> =>
  httpClient
    .post(authEndpoints.registration, data)
    .then((response) => response.data)

export const useRegistration = () => {
  const navigate = useNavigate()
  const { login } = useAuthContext()

  return useMutation<LoginResponse, Error, RegistrationRequest>({
    mutationKey: ['registration'],
    mutationFn: httpRegistration,
    onSuccess: async (data) => {
      await login(data.accessToken)
      await navigate({
        from: '/authentication/registration',
        to: '/',
      })
    },
  })
}
