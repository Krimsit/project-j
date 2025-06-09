import { useParams, useNavigate } from '@tanstack/react-router'
import { Flex, Title, NavLink } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { useProjectBoards } from '@dto/board'

import type { FC, SyntheticEvent } from 'react'

const ProjectBoards: FC = () => {
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const { data } = useProjectBoards()

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
      <Title order={2} fw={700}>
        Доски
      </Title>
      {data?.map((item) => (
        <NavLink
          href={`/dashboard/${params.projectId}/boards/${params.boardId}`}
          key={item.id}
          label={item.name}
          active={item.id === params.boardId}
          onClick={handleOpenBoard(item.id)}
          rightSection={
            <IconChevronRight
              size={12}
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />
      ))}
    </Flex>
  )
}

export default ProjectBoards
