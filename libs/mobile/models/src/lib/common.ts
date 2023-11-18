import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RootRoutesProps, ShellRoutesProps } from './routes'

type OptionsVariant = BottomTabNavigationOptions | NativeStackNavigationOptions

type NameVariant = keyof RootRoutesProps | keyof ShellRoutesProps

export type RouteObjectParams<
  T extends NameVariant,
  Options extends OptionsVariant,
> = {
  name: T
  options: Options
}
