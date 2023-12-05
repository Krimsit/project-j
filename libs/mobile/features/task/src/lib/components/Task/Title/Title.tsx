import { Text } from 'react-native-paper'
import { useTaskStatusIcon } from '@mobile/ui'
import { TaskStatus } from '@shared/models'

import { useTaskQuery } from '../../../hook'

import { Container, StatusChip, TextContainer } from './Title.styles'

import type { FC } from 'react'

export const Title: FC = () => {
  const { data } = useTaskQuery()
  const icon = useTaskStatusIcon(data?.getTask.status ?? TaskStatus.ToDo)

  if (!data) {
    return null
  }

  const { name, project } = data.getTask
  const { name: projectName } = project

  return (
    <Container>
      <StatusChip>{icon}</StatusChip>
      <TextContainer>
        <Text variant={'titleSmall'}>{projectName}</Text>
        <Text variant={'titleLarge'}>{name}</Text>
      </TextContainer>
    </Container>
  )
}
