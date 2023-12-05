import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import { useProjectQuery, useProjectTasksQuery } from '../hook'
import { Project } from '../components'

import { Container } from './Project.styles'

import type { FC } from 'react'

export const ProjectFeature: FC = () => {
  const { loading, refetch, data } = useProjectQuery()
  const { refetch: refetchProjectTasks } = useProjectTasksQuery()

  useFocusEffect(() => {
    void refetch({ value: data?.getProject._id || '' })
    void refetchProjectTasks({ value: data?.getProject._id || '' })
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
