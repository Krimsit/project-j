import { useTheme } from 'styled-components'
import { ScrollView } from 'react-native'
import { Card } from 'react-native-paper'

import { Header, Info, LogoutButton, DeleteButton } from '../components'

import { Container, Content } from './User.styles'

import type { FC } from 'react'

export const UserFeature: FC = () => {
  const theme = useTheme()

  return (
    <ScrollView>
      <Container>
        <Card
          mode={'elevated'}
          theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
        >
          <Card.Content>
            <Content>
              <Header />
              <Info />
              <LogoutButton />
              <DeleteButton />
            </Content>
          </Card.Content>
        </Card>
      </Container>
    </ScrollView>
  )
}
