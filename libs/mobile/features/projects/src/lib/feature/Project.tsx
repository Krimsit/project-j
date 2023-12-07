import { useFocusEffect, useRoute } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import { useProjectQuery, useProjectTasksQuery } from '../hooks'
import { Project } from '../components'

import { Container } from './Project.styles'

import type { FC } from 'react'
import type { ProjectRouterProps } from '../types'

export const ProjectFeature: FC = () => {
  const router = useRoute<ProjectRouterProps>()
  const id = router.params.projectId
  const { loading, refetch } = useProjectQuery()
  const { refetch: refetchProjectTasks } = useProjectTasksQuery()

  useFocusEffect(() => {
    void refetch({ value: id })
    void refetchProjectTasks({ value: id })
  })

  if (loading) {
    return <ActivityIndicator animating />
  }

  return (
    <Container>
      <Project />
    </Container>
  )
}
