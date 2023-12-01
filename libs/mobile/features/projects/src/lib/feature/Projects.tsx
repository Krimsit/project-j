import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import { useUserProjectsQuery } from '../hook'
import { Projects } from '../components'

import { Container } from './Projects.styles'

import type { FC } from 'react'

export const ProjectsFeature: FC = () => {
  const isFocused = useIsFocused()
  const { loading, refetch } = useUserProjectsQuery()

  useEffect(() => {
    if (isFocused) {
      void refetch()
    }
  }, [isFocused])

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
