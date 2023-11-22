import { ThemeProvider } from 'styled-components'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { customTheme } from '@shared/theme'

import type { ReactNode } from 'react'

// eslint-disable-next-line react/display-name
export const withPaper = (component: () => ReactNode) => () => (
  <ThemeProvider theme={customTheme}>
    <PaperProvider theme={customTheme}>
      <NavigationContainer theme={customTheme}>
        {component()}
      </NavigationContainer>
    </PaperProvider>
  </ThemeProvider>
)
