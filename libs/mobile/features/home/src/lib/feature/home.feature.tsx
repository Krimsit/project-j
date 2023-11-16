import { View, Text, Button } from 'react-native'
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
    <View>
      <Text>Home</Text>
      <Button title={'Open task'} onPress={handleOpenTask} />
    </View>
  )
}
