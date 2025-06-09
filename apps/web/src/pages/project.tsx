import { Fragment } from 'react'
import { Container, Divider, Flex, Title } from '@mantine/core'
import { IconHomeFilled } from '@tabler/icons-react'
import { useProjectBoards } from '@dto/board'
import { useUserProjectTask } from '@dto/task'
import {
  PageCover,
  ProjectInfo,
  ProjectBoards,
  TasksTable,
  TaskDrawer,
} from '@components'

import type { FC } from 'react'

const ProjectPage: FC = () => {
  const { data: projectBoards } = useProjectBoards()
  const { data: userProjectTasks } = useUserProjectTask()

  return (
    <Fragment>
      <PageCover icon={IconHomeFilled} />
      <Container size={'xl'} p={'xl'} mt={64}>
        <ProjectInfo />
        {userProjectTasks?.length !== 0 && (
          <Fragment>
            <Divider my={'xl'} />
            <Flex direction={'column'} gap={'xs'}>
              <Title order={2} fw={700}>
                Мои задачи
              </Title>
              <TasksTable tasks={userProjectTasks ?? []} />
            </Flex>
          </Fragment>
        )}
        {projectBoards?.length !== 0 && (
          <Fragment>
            <Divider my={'xl'} />
            <ProjectBoards />
          </Fragment>
        )}
      </Container>
      <TaskDrawer />
    </Fragment>
  )
}

export default ProjectPage
