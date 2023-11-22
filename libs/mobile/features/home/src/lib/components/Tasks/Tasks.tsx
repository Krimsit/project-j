import { Text } from 'react-native-paper'
import { TaskCard } from '@mobile/ui'
import { TaskPriority, TaskStatus } from '@shared/models'

import { Container, List, Title } from './Tasks.styles'

import type { FC } from 'react'

export const Tasks: FC = () => (
  <Container>
    <Title>
      <Text variant={'titleMedium'}>Assigned Tasks (3)</Text>
    </Title>
    <List>
      <TaskCard
        _id={'1'}
        name={'Task 1'}
        attachmentsCount={3}
        status={TaskStatus.ToDo}
        priority={TaskPriority.Low}
        assignedTasksCount={3}
        dueDate={'22.11.2023'}
        projectName={'Project'}
        assignerAvatar={
          'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4'
        }
      />
      <TaskCard
        _id={'2'}
        name={'Task 1'}
        attachmentsCount={3}
        status={TaskStatus.InProgress}
        priority={TaskPriority.Medium}
        assignedTasksCount={0}
        dueDate={'22.11.2023'}
        projectName={'Project'}
        assignerAvatar={
          'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4'
        }
      />
      <TaskCard
        _id={'2'}
        name={'Task 1'}
        attachmentsCount={0}
        status={TaskStatus.Done}
        priority={TaskPriority.High}
        assignedTasksCount={3}
        dueDate={'22.11.2023'}
        projectName={'Project'}
        assignerAvatar={
          'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4'
        }
      />
    </List>
  </Container>
)
