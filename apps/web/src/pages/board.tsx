import { Fragment, useState } from 'react'
import { Container, Divider, Flex, Button } from '@mantine/core'
import { IconBrandTrello, IconPlus } from '@tabler/icons-react'
import { useBoardTask } from '@dto/task'
import {
  PageCover,
  BoardInfo,
  TasksTable,
  CreateTaskModal,
  TaskDrawer,
} from '@components'

import type { FC } from 'react'

const BoardPage: FC = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const { data: boardTasks } = useBoardTask()

  const handleOpenCreateModal = () => setIsOpenCreateModal(true)

  const handleCloseCreateModal = () => setIsOpenCreateModal(false)

  return (
    <Fragment>
      <PageCover icon={IconBrandTrello} />
      <Container size={'xl'} p={'xl'} mt={64}>
        <BoardInfo />
        <Divider my={'xl'} />
        <Flex direction={'column'} gap={'md'}>
          <Button
            onClick={handleOpenCreateModal}
            variant={'outline'}
            leftSection={<IconPlus size={14} />}
          >
            Добавить задачу
          </Button>
          <TasksTable tasks={boardTasks ?? []} />
        </Flex>
      </Container>
      <CreateTaskModal
        isOpen={isOpenCreateModal}
        onClose={handleCloseCreateModal}
      />
      <TaskDrawer />
    </Fragment>
  )
}

export default BoardPage
