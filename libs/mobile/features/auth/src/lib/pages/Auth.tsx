import { Routes } from '@mobile/models'

import { AuthFeature } from '../feature'

import type { FC } from 'react'
import type { DrawerNavigationOptions } from '@react-navigation/drawer'
import type { RouteObjectParams, MainRoutesProps } from '@mobile/models'

export const AuthPage: FC = () => <AuthFeature />

export const authTabParams: RouteObjectParams<
  keyof MainRoutesProps,
  DrawerNavigationOptions
> = {
  name: Routes.Auth,
  options: {
    headerShown: false,
  },
}
