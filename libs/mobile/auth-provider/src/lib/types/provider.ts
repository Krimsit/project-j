export enum AuthActions {
  SignIn = 'SignIn',
  SignOut = 'SignOut',
  RestoreToken = 'RestoreToken',
}

export type AuthData = {
  userToken: string
  isLoading: boolean
  isSignOut: boolean
}

export type AuthAction =
  | {
      type: AuthActions.RestoreToken | AuthActions.SignIn
      token: string
    }
  | {
      type: AuthActions.SignOut
    }
