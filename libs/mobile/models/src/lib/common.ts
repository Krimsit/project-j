import type { DrawerNavigationOptions } from '@react-navigation/drawer'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RootRoutesProps, MainRoutesProps } from './routes'

type OptionsVariant =
  | BottomTabNavigationOptions
  | DrawerNavigationOptions
  | NativeStackNavigationOptions

type NameVariant = keyof MainRoutesProps | keyof RootRoutesProps

export type RouteObjectParams<
  T extends NameVariant,
  Options extends OptionsVariant,
> = {
  name: T
  options: Options
}
