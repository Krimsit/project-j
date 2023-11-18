import { Fragment, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Text } from 'react-native-paper'

import type { FC } from 'react'
import type { NavigationProps } from '@mobile/models'
import type { TaskRouterProps } from './task.types'

export const TaskFeature: FC = () => {
  const router = useRoute<TaskRouterProps>()
  const navigation = useNavigation<NavigationProps>()

  useEffect(() => {
    navigation.setOptions({
      title: router.params.taskId,
    })
  }, [navigation, router])

  return (
    <Fragment>
      <Text>Task</Text>
      <Text>{router.params.taskId}</Text>
    </Fragment>
  )
}
