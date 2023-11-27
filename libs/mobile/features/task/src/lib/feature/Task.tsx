import { ScrollView } from 'react-native'

import { Task } from '../components'

import { Container } from './TaskForm.styles'

import type { FC } from 'react'

export const TaskFeature: FC = () => (
  <ScrollView>
    <Container>
      <Task />
    </Container>
  </ScrollView>
)
