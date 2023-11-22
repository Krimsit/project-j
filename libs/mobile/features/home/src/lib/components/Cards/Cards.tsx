import { useTheme } from 'styled-components'

import { Card } from './Card'
import { Container } from './Cards.styles'

import type { FC } from 'react'

export const Cards: FC = () => {
  const theme = useTheme()
  const handleOpenAssignedTasks = () => console.log('Open assigned tasks')
  const handleOpenMyProjects = () => console.log('Open my tasks')

  return (
    <Container elevation={0} mode={'flat'}>
      <Card
        color={theme.colors.taskPriority.low}
        title={'Assigned Tasks'}
        count={20}
        icon={'clipboard-outline'}
        onPress={handleOpenAssignedTasks}
      />
      <Card
        color={theme.colors.taskPriority.medium}
        title={'Ongoing projects'}
        count={5}
        icon={'format-list-bulleted'}
        onPress={handleOpenMyProjects}
      />
    </Container>
  )
}
