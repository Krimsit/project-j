import { ScrollView } from 'react-native'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { User, Tasks, Cards } from '../components'

import { Container } from './home.styles'

import type { FC } from 'react'

export const HomeFeature: FC = () => {
  const navigation = useRootNavigation()
  const handleOpenTask = () =>
    navigation.push(Routes.Task, {
      taskId: 'taskId1',
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
