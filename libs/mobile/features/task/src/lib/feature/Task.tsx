import { useFocusEffect } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import { useTaskQuery } from '../hook'
import { Task } from '../components'

import { Container } from './TaskForm.styles'

import type { FC } from 'react'

export const TaskFeature: FC = () => {
  const { loading, refetch, data } = useTaskQuery()

  useFocusEffect(() => {
    void refetch({ value: data?.getTask._id || '' })
  })

  if (loading) {
    return <ActivityIndicator animating />
  }

  return (
    <ScrollView>
      <Container>
        <Task />
      </Container>
    </ScrollView>
  )
}
