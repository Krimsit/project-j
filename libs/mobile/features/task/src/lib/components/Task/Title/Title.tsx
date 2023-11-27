import { Card, Text } from 'react-native-paper'
import { useTaskStatusIcon } from '@mobile/ui'
import { TaskStatus } from '@shared/models'

import { Container, TextContainer, StatusChip } from './Title.styles'

import type { FC } from 'react'

export const Title: FC = () => {
  const icon = useTaskStatusIcon(TaskStatus.ToDo)

  return (
    <Container>
      <StatusChip>{icon}</StatusChip>
      <TextContainer>
        <Text variant={'titleSmall'}>Project</Text>
        <Text variant={'titleLarge'}>Task</Text>
      </TextContainer>
    </Container>
  )
}
