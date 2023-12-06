import 'react-native-gesture-handler'
import { Shell } from '@mobile/shell'
import { withProviders } from '@mobile/configs'

import type { FC } from 'react'

export const App: FC = () => <Shell />

export default withProviders(App)
