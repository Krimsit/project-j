import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Button } from 'react-native-paper'
import { ApiActions, useApiDispatch } from '@mobile/api-provider'

import type { FC } from 'react'

export const DrawerContent: FC = () => {
  const dispatch = useApiDispatch()

  const handleExit = () => {
    dispatch({ type: ApiActions.Delete })
  }

  return (
    <DrawerContentScrollView>
      <Button onPress={handleExit} mode={'outlined'}>
        Exit
      </Button>
    </DrawerContentScrollView>
  )
}
