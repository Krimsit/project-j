import compose from 'compose-function'

import { withApollo } from './apollo'
import { withPaper } from './paper'
import { withDeviceSize } from './device-size'
import { withAuth } from './auth'

import type { ReactElement } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const withProviders = compose(
  withApollo,
  withAuth,
  withPaper,
  withDeviceSize,
) as (a: unknown) => () => ReactElement
