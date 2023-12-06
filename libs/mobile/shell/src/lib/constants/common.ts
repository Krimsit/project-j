import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import type {
  RootRoutesProps,
  MainRoutesProps,
  DrawerRoutesProps,
} from '@mobile/models'

export const RootTabs = createBottomTabNavigator<RootRoutesProps>()

export const ShellStack = createNativeStackNavigator<MainRoutesProps>()

export const DrawerStack = createDrawerNavigator<DrawerRoutesProps>()
