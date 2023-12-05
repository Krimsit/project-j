import { useTheme } from 'styled-components'

import { useUserTasksQuery, useUserProjectsQuery } from '../../hook'

import { Card } from './Card'
import { Container } from './Cards.styles'

import type { FC } from 'react'

export const Cards: FC = () => {
  const theme = useTheme()
  const { data: tasks, loading: taskLoading } = useUserTasksQuery()
  const { data: projects, loading: projectLoading } = useUserProjectsQuery()
  const handleOpenAssignedTasks = () => console.log('Open assigned tasks')
  const handleOpenMyProjects = () => console.log('Open my tasks')

  return (
    <Container elevation={0} mode={'flat'}>
      <Card
        color={theme.colors.taskPriority.low}
        title={'Assigned Tasks'}
        count={projects?.getUserProjects.length ?? 0}
        icon={'clipboard-outline'}
        onPress={handleOpenAssignedTasks}
        loading={projectLoading}
      />
      <Card
        color={theme.colors.taskPriority.medium}
        title={'Ongoing projects'}
        count={tasks?.getUserTasks.length ?? 0}
        icon={'format-list-bulleted'}
        onPress={handleOpenMyProjects}
        loading={taskLoading}
      />
    </Container>
  )
}
