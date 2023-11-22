import type { MD3Theme } from 'react-native-paper'
import type { Theme as NavigationTheme } from '@react-navigation/native'

export type Theme = MD3Theme &
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
