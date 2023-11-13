import compose from 'compose-function'

import { withApollo } from './apollo'
import { withSafeArea } from './safe-area'
import { withDeviceSize } from './device-size'

import type { ReactElement } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const withProviders = compose(
  withApollo,
  withSafeArea,
  withDeviceSize,
) as (a: unknown) => () => ReactElement
