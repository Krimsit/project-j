import 'styled-components'
import type { MD3Theme } from 'react-native-paper'
import type { Theme as NavigationTheme } from '@react-navigation/native/lib/typescript/src/types'

type Theme = MD3Theme &
  NavigationTheme & {
    colors: {
      taskStatuses: {
        todo: string
        inProgress: string
        completed: string
      }
      taskPriority: {
        low: string
        medium: string
        high: string
      }
    }
  }

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
