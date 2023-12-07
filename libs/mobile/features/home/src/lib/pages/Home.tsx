import { Icon } from 'react-native-paper'
import { Routes } from '@mobile/models'
import { AppBar } from '@mobile/ui'

import { HomeFeature } from '../feature'

import type { FC } from 'react'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { RouteObjectParams, RootRoutesProps } from '@mobile/models'

export const HomePage: FC = () => <HomeFeature />

export const homeTabParams: RouteObjectParams<
  keyof RootRoutesProps,
  BottomTabNavigationOptions
> = {
  name: Routes.Home,
  options: {
    header: () => <AppBar title={'Home'} />,
    tabBarLabel: 'Home',
    tabBarIcon({ color, size }) {
      return <Icon source="home" size={size} color={color} />
    },
  },
}
