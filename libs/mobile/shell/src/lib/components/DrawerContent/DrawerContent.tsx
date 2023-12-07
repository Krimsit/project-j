import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { ApiActions, useApiDispatch, useApiState } from '@mobile/api-provider'

import { Container, Content } from './DrawerContent.styles'

import type { FC } from 'react'
import type { DrawerContentComponentProps } from '@react-navigation/drawer'

export const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useApiDispatch()
  const { apiUri } = useApiState()

  const handleExit = () => {
    dispatch({ type: ApiActions.Delete })
  }

  return (
    <Container {...props}>
      <Content>
        <View>
          <Text variant={'titleLarge'}>Current API:</Text>
          <Text variant={'bodyLarge'}>{apiUri}</Text>
        </View>
        <Button onPress={handleExit} mode={'outlined'}>
          Exit
        </Button>
      </Content>
    </Container>
  )
}
