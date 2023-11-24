import { useTheme } from 'styled-components'
import { ScrollView } from 'react-native'
import { TaskPriority, TaskStatus } from '@shared/models'

import { Column } from './parts'
import { Container } from './Board.styles'

import type { FC } from 'react'
import type { TaskCardProps } from '@shared/models'

const todoTasks: TaskCardProps[] = [
  {
    _id: '1',
    name: 'Task 1',
    attachmentsCount: 3,
    assignedTasksCount: 3,
    dueDate: '22.11.2023',
    projectName: 'Project',
    assignerAvatar:
      'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
    status: TaskStatus.ToDo,
    priority: TaskPriority.Medium,
  },
  {
    _id: '2',
    name: 'Task 2',
    attachmentsCount: 3,
    assignedTasksCount: 3,
    dueDate: '22.11.2023',
    projectName: 'Project',
    assignerAvatar:
      'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
    status: TaskStatus.ToDo,
    priority: TaskPriority.Medium,
  },
  {
    _id: '3',
    name: 'Task 3',
    attachmentsCount: 3,
    assignedTasksCount: 3,
    dueDate: '22.11.2023',
    projectName: 'Project',
    assignerAvatar:
      'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
    status: TaskStatus.ToDo,
    priority: TaskPriority.Medium,
  },
]
const inProgressTasks: TaskCardProps[] = [
  {
    _id: '4',
    name: 'Task 4',
    attachmentsCount: 3,
    assignedTasksCount: 3,
    dueDate: '22.11.2023',
    projectName: 'Project',
    assignerAvatar:
      'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
    status: TaskStatus.InProgress,
    priority: TaskPriority.High,
  },
  {
    _id: '5',
    name: 'Task 5',
    attachmentsCount: 3,
    assignedTasksCount: 3,
    dueDate: '22.11.2023',
    projectName: 'Project',
    assignerAvatar:
      'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
    status: TaskStatus.InProgress,
    priority: TaskPriority.High,
  },
]
const doneTasks: TaskCardProps[] = [
  {
    _id: '6',
    name: 'Task 6',
    attachmentsCount: 3,
    assignedTasksCount: 3,
    dueDate: '22.11.2023',
    projectName: 'Project',
    assignerAvatar:
      'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
    status: TaskStatus.Done,
    priority: TaskPriority.Low,
  },
]

export const Board: FC = () => {
  const theme = useTheme()

  return (
    <ScrollView horizontal>
      <Container>
        <Column
          title={'To Do'}
          cards={todoTasks}
          color={theme.colors.taskStatuses.todo}
        />
        <Column
          title={'In Progress'}
          cards={inProgressTasks}
          color={theme.colors.taskStatuses.inProgress}
        />
        <Column
          title={'Done'}
          cards={doneTasks}
          color={theme.colors.taskStatuses.completed}
        />
        <Column
          title={'On Hold'}
          cards={[]}
          color={theme.colors.taskStatuses.todo}
        />
      </Container>
    </ScrollView>
  )
}
