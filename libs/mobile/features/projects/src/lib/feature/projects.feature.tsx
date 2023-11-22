import { ScrollView } from 'react-native'

import { Projects } from '../components'

import { Container } from './projects.styles'

import type { FC } from 'react'

export const ProjectsFeature: FC = () => (
  <ScrollView>
    <Container>
      <Projects />
    </Container>
  </ScrollView>
)
