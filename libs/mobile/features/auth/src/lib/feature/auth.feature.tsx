import { useState } from 'react'
import { useTheme } from 'styled-components'
import { Button } from 'react-native-paper'

import { Login, Registration } from '../components'

import { Container, Card, Content } from './auth.styles'

import type { FC } from 'react'

export const PageFeature: FC = () => {
  const theme = useTheme()
  const [isRegistration, setIsRegistration] = useState(false)
  const title = isRegistration ? 'Registration' : 'Login'
  const buttonText = isRegistration ? 'Login' : 'Registration'
  const handleToggleForm = () => setIsRegistration(!isRegistration)

  return (
    <Container>
      <Card
        mode={'elevated'}
        theme={{ colors: { elevation: { level1: theme.colors.onPrimary } } }}
      >
        <Card.Title title={title} titleVariant={'titleLarge'} />
        <Content>{isRegistration ? <Registration /> : <Login />}</Content>
        <Card.Actions>
          <Button mode={'text'} onPress={handleToggleForm} uppercase>
            {buttonText}
          </Button>
        </Card.Actions>
      </Card>
    </Container>
  )
}
