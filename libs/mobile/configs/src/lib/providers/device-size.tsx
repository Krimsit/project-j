import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { ReactNode } from 'react'

// eslint-disable-next-line react/display-name
export const withDeviceSize = (component: () => ReactNode) => () => {
  const { top, left, right, bottom } = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right,
        flex: 1,
      }}
    >
      {component()}
    </View>
  )
}
