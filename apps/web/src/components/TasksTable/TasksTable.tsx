import { useMemo, useCallback } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { Table, Avatar, Button } from '@mantine/core'

import type { FC } from 'react'
import type { TaskCardResponse } from '@shared/types'

export type TasksTableProps = {
  tasks: TaskCardResponse[]
}

const TasksTable: FC<TasksTableProps> = ({ tasks }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleOpenTask = useCallback(
    (id: string) => {
      return navigate({
        to: location.href,
        search: {
          taskId: id,
        },
      })
    },
    [navigate],
  )

  const rows = useMemo(() => {
    return tasks.map((item) => (
      <Table.Tr key={item.id}>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>
          <Avatar src={item.assigner.avatar} />
        </Table.Td>
        <Table.Td>{item.dueDate.toLocaleString('ru')}</Table.Td>
        <Table.Td>{item.status}</Table.Td>
        <Table.Td>
          <Button onClick={() => handleOpenTask(item.id)} variant={'subtle'}>
            Открыть
          </Button>
        </Table.Td>
      </Table.Tr>
    ))
  }, [tasks, handleOpenTask])

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Название</Table.Th>
          <Table.Th>Исполнитель</Table.Th>
          <Table.Th>Дата завершение</Table.Th>
          <Table.Th>Статус</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}

export default TasksTable
