import { useFocusEffect } from '@react-navigation/native'
import { ScrollView } from 'react-native'

import { useUserProjectsQuery, useUserTasksQuery } from '../hook'
import { User, Tasks, Cards } from '../components'

import { Container } from './home.styles'

import type { FC } from 'react'

export const HomeFeature: FC = () => {
  const { refetch: refetchTasks } = useUserTasksQuery()
  const { refetch: refetchProjects } = useUserProjectsQuery()

  useFocusEffect(() => {
    void refetchProjects()
    void refetchTasks()
  })

  return (
    <ScrollView>
      <Container>
        <User />
        <Cards />
        <Tasks />
      </Container>
    </ScrollView>
  )
}
