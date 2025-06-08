import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useGoogleLogin } from '@dto/auth'

import type { FC } from 'react'
import type { CredentialResponse } from '@react-oauth/google'

const InnerGoogleLoginButton: FC = () => {
  const { mutate } = useGoogleLogin()

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return

    mutate(credentialResponse.credential)
  }

  const handleError = () => {
    console.log('Login Failed')
  }

  return (
    <GoogleLogin
      type={'standard'}
      text={'continue_with'}
      locale={'zh_CN'}
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
    />
  )
}

const GoogleLoginButton: FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''}>
      <InnerGoogleLoginButton />
    </GoogleOAuthProvider>
  )
}

export default GoogleLoginButton
