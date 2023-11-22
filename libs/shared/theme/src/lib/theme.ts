import { adaptNavigationTheme, MD3LightTheme } from 'react-native-paper'
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'

import type { Theme } from './theme.types'

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
})

export const customTheme: Theme = {
  ...MD3LightTheme,
  ...LightTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: 'rgb(129, 85, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 221, 178)',
    onPrimaryContainer: 'rgb(41, 24, 0)',
    secondary: 'rgb(150, 73, 0)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 220, 198)',
    onSecondaryContainer: 'rgb(49, 19, 0)',
    tertiary: 'rgb(155, 68, 39)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 219, 208)',
    onTertiaryContainer: 'rgb(58, 11, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(31, 27, 22)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(31, 27, 22)',
    surfaceVariant: 'rgb(240, 224, 207)',
    onSurfaceVariant: 'rgb(79, 69, 57)',
    outline: 'rgb(129, 117, 103)',
    outlineVariant: 'rgb(211, 196, 180)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(52, 48, 42)',
    inverseOnSurface: 'rgb(249, 239, 231)',
    inversePrimary: 'rgb(255, 185, 77)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(249, 243, 242)',
      level2: 'rgb(245, 238, 235)',
      level3: 'rgb(241, 233, 227)',
      level4: 'rgb(240, 231, 224)',
      level5: 'rgb(237, 228, 219)',
    },
    surfaceDisabled: 'rgba(31, 27, 22, 0.12)',
    onSurfaceDisabled: 'rgba(31, 27, 22, 0.38)',
    backdrop: 'rgba(56, 47, 36, 0.4)',
    taskStatuses: {
      todo: 'rgb(150, 73, 0)',
      completed: '#94AC5D',
      inProgress: '#9EC4E6',
    },
    taskPriority: {
      low: '#94AC5D',
      medium: '#9EC4E6',
      high: '#E06777',
    },
  },
}
