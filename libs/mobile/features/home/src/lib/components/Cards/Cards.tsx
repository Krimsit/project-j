import { useTheme } from 'styled-components'
import { useNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { useUserTasksQuery, useUserProjectsQuery } from '../../hook'

import { Card } from './Card'
import { Container } from './Cards.styles'

import type { FC } from 'react'

export const Cards: FC = () => {
  const navigation = useNavigation()
  const theme = useTheme()
  const { data: tasks, loading: taskLoading } = useUserTasksQuery()
  const { data: projects, loading: projectLoading } = useUserProjectsQuery()

  const handleOpenMyProjects = () => {
    navigation.navigate(Routes.Projects, {
      screen: Routes.Projects,
    })
  }

  return (
    <Container elevation={0} mode={'flat'}>
      <Card
        color={theme.colors.taskPriority.low}
        title={'Assigned Tasks'}
        count={tasks?.getUserTasks.length ?? 0}
        icon={'clipboard-outline'}
        loading={taskLoading}
      />
      <Card
        color={theme.colors.taskPriority.medium}
        title={'Ongoing projects'}
        count={projects?.getUserProjects.length ?? 0}
        icon={'format-list-bulleted'}
        onPress={handleOpenMyProjects}
        loading={projectLoading}
      />
    </Container>
  )
}
