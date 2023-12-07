import { View } from 'react-native'

import { useGetDeviceSize } from '../hooks'

import type { ReactNode } from 'react'

// eslint-disable-next-line react/display-name
export const withDeviceSize = (component: () => ReactNode) => () => {
  const style = useGetDeviceSize()

  return <View style={style}>{component()}</View>
}
