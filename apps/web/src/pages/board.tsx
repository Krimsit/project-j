import { Fragment } from 'react'
import { Container } from '@mantine/core'
import { IconBrandTrello } from '@tabler/icons-react'
import { PageCover, BoardInfo } from '@components'

import type { FC } from 'react'

const BoardPage: FC = () => {
  return (
    <Fragment>
      <PageCover icon={IconBrandTrello} />
      <Container size={'xl'} p={'xl'} mt={64}>
        <BoardInfo />
      </Container>
    </Fragment>
  )
}

export default BoardPage
