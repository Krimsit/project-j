import 'styled-components'
import { MD3Theme } from 'react-native-paper'
import { Theme } from '@react-navigation/native'

declare module 'styled-components' {
  export interface DefaultTheme extends MD3Theme {}
}
