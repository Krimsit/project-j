import { useFocusEffect } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import { useUserProjectsQuery } from '../hooks'
import { Projects } from '../components'

import { Container } from './Projects.styles'

import type { FC } from 'react'

export const ProjectsFeature: FC = () => {
  const { loading, refetch } = useUserProjectsQuery()

  useFocusEffect(() => {
    void refetch()
  })

  if (loading) {
    return <ActivityIndicator animating />
  }

  return (
    <ScrollView>
      <Container>
        <Projects />
      </Container>
    </ScrollView>
  )
}
