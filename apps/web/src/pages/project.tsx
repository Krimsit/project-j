import { Fragment } from 'react'
import { Container } from '@mantine/core'
import { ProjectCover, ProjectInfo } from '@components'

import type { FC } from 'react'

const ProjectPage: FC = () => {
  return (
    <Fragment>
      <ProjectCover />
      <Container size={'xl'} p={'xl'} mt={64}>
        <ProjectInfo />
      </Container>
    </Fragment>
  )
}

export default ProjectPage
