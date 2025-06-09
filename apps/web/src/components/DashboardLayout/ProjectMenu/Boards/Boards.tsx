import { useState } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { Flex, Text, Button, NavLink } from '@mantine/core'
import { IconPlus, IconBrandTrello } from '@tabler/icons-react'
import { useProjectBoards } from '@dto/board'

import { CreateModal } from './CreateModal'

import type { FC, SyntheticEvent } from 'react'

const Boards: FC = () => {
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const { data } = useProjectBoards()

  const handleOpenCreateModal = () => setIsOpenCreateModal(true)

  const handleCloseCreateModal = () => setIsOpenCreateModal(false)

  const handleOpenBoard = (id: string) => (event: SyntheticEvent) => {
    event.preventDefault()

    return navigate({
      to: '/dashboard/$projectId/boards/$boardId',
      params: {
        projectId: params.projectId ?? '',
        boardId: id,
      },
    })
  }

  return (
    <Flex direction={'column'} gap={'xs'}>
      <Text fw={700}>Доски</Text>
      <Button
        onClick={handleOpenCreateModal}
        rightSection={<IconPlus size={14} />}
        size={'compact-sm'}
        justify={'space-between'}
        variant={'subtle'}
      >
        Добавить доску
      </Button>
      {data?.map((item) => (
        <NavLink
          href={`/dashboard/${params.projectId}/boards/${params.boardId}`}
          key={item.id}
          label={item.name}
          active={item.id === params.boardId}
          onClick={handleOpenBoard(item.id)}
          leftSection={<IconBrandTrello size={14} />}
        />
      ))}
      <CreateModal
        isOpen={isOpenCreateModal}
        onClose={handleCloseCreateModal}
      />
    </Flex>
  )
}

export default Boards
