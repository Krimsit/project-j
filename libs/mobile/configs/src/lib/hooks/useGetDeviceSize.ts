import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { ViewStyle } from 'react-native'

export const useGetDeviceSize = (): ViewStyle => {
  const { top, left, right, bottom } = useSafeAreaInsets()

  return {
    paddingTop: top,
    paddingBottom: bottom,
    paddingLeft: left,
    paddingRight: right,
    flex: 1,
  }
}
