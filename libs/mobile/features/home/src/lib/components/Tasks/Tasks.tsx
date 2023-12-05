import { Text, ActivityIndicator } from 'react-native-paper'
import { TaskCard } from '@mobile/ui'

import { useUserTasksQuery } from '../../hook'

import { Container, List, Title } from './Tasks.styles'

import type { FC } from 'react'

export const Tasks: FC = () => {
  const { data, loading } = useUserTasksQuery()

  if (loading) {
    return <ActivityIndicator animating />
  }

  return (
    <Container>
      <Title>
        <Text variant={'titleMedium'}>
          Assigned Tasks ({data?.getUserTasks.length})
        </Text>
      </Title>
      <List>
        {data?.getUserTasks.map((task) => (
          <TaskCard key={task._id} {...task} />
        ))}
      </List>
    </Container>
  )
}
