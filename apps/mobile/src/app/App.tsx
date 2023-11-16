import { Layout } from '@mobile/shell'
import { withProviders } from '@mobile/configs'

import type { FC } from 'react'

export const App: FC = () => <Layout />

export default withProviders(App)
