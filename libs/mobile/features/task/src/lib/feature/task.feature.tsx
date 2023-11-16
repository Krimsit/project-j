import { useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { View, Text, Button } from 'react-native'

import type { FC } from 'react'
import type { NavigationProps } from '@mobile/models'
import type { TaskRouterProps } from './task.types'

export const TaskFeature: FC = () => {
  const router = useRoute<TaskRouterProps>()
  const navigation = useNavigation<NavigationProps>()

  useEffect(() => {
    navigation.setOptions({
      title: router.params.taskId,
      headerLeft: () => <Button onPress={navigation.goBack} title="Back" />,
    })
  }, [navigation, router])

  return (
    <View>
      <Text>Task</Text>
      <Text>{router.params.taskId}</Text>
    </View>
  )
}
