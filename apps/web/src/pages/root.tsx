import { useSuspenseQuery } from '@tanstack/react-query'

import { testQuery } from '../dto/test'

import type { FC } from 'react'

const RootPage: FC = () => {
  const { data } = useSuspenseQuery(testQuery)

  return <div>{data}</div>
}

export default RootPage
