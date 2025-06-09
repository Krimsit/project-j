import { Fragment } from 'react'
import { Container, Divider } from '@mantine/core'
import { IconHomeFilled } from '@tabler/icons-react'
import { useProjectBoards } from '@dto/board'
import { PageCover, ProjectInfo, ProjectBoards } from '@components'

import type { FC } from 'react'

const ProjectPage: FC = () => {
  const { data: projectBoards } = useProjectBoards()

  return (
    <Fragment>
      <PageCover icon={IconHomeFilled} />
      <Container size={'xl'} p={'xl'} mt={64}>
        <ProjectInfo />
        {projectBoards?.length !== 0 && (
          <Fragment>
            <Divider my={'xl'} />
            <ProjectBoards />
          </Fragment>
        )}
      </Container>
    </Fragment>
  )
}

export default ProjectPage
