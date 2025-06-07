import { useProfile } from '@dto/user'

import type { FC } from 'react'

const DashboardPage: FC = () => {
  const { data } = useProfile()

  return (
    <div>
      {data?.email}, {data?.username}
    </div>
  )
}

export default DashboardPage
