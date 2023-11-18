import { Fragment } from 'react'
import { Text, Button } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import type { FC } from 'react'

export const HomeFeature: FC = () => {
  const navigation = useRootNavigation()
  const handleOpenTask = () =>
    navigation.push(Routes.Task, {
      taskId: 'taskId1',
    })

  return (
    <Fragment>
      <Text>Home</Text>
      <Button onPress={handleOpenTask}>Open task</Button>
    </Fragment>
  )
}
