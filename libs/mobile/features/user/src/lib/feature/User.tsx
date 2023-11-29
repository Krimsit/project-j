import { useTheme } from 'styled-components'
import { ScrollView } from 'react-native'
import { ActivityIndicator, Card } from 'react-native-paper'
import { useUserQuery } from '@mobile/hooks'

import { Header, Info, LogoutButton, DeleteButton } from '../components'

import { Container, Content } from './User.styles'

import type { FC } from 'react'

export const UserFeature: FC = () => {
  const theme = useTheme()
  const { loading } = useUserQuery()

  if (loading) {
    return <ActivityIndicator animating />
  }

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
