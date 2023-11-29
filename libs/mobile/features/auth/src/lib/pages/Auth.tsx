import { Routes } from '@mobile/models'

import { AuthFeature } from '../feature'

import type { FC } from 'react'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RouteObjectParams, ShellRoutesProps } from '@mobile/models'

export const AuthPage: FC = () => <AuthFeature />

export const authTabParams: RouteObjectParams<
  keyof ShellRoutesProps,
  NativeStackNavigationOptions
> = {
  name: Routes.Auth,
  options: {
    headerShown: false,
  },
}
