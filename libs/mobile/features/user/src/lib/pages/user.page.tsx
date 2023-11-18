import { Icon } from 'react-native-paper'
import { Routes } from '@mobile/models'
import { AppBar } from '@mobile/ui'

import { UserFeature } from '../feature'

import type { FC } from 'react'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { RouteObjectParams, RootRoutesProps } from '@mobile/models'

export const UserPage: FC = () => <UserFeature />

export const userTabParams: RouteObjectParams<
  keyof RootRoutesProps,
  BottomTabNavigationOptions
> = {
  name: Routes.User,
  options: {
    header: () => <AppBar title={'Настройки'} />,
    tabBarLabel: 'Настройки',
    tabBarIcon({ color, size }) {
      return <Icon source="account" size={size} color={color} />
    },
  },
}
