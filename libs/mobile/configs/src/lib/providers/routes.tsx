import { NavigationContainer } from '@react-navigation/native'

import type { ReactNode } from 'react'

// eslint-disable-next-line react/display-name
export const withRoutes = (component: () => ReactNode) => () => (
  <NavigationContainer>{component()}</NavigationContainer>
)
