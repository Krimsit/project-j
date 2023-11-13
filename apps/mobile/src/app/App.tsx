import { Page } from '@mobile/feature/user'
import { withProviders } from '@mobile/configs'

import type { FC } from 'react'

export const App: FC = () => <Page />

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withProviders(App)
