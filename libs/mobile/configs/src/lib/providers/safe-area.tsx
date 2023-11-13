import { SafeAreaProvider } from 'react-native-safe-area-context'

import type { ReactNode } from 'react'

// eslint-disable-next-line react/display-name
export const withSafeArea = (component: () => ReactNode) => () => (
  <SafeAreaProvider>{component()}</SafeAreaProvider>
)
