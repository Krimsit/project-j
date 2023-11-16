import { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import type { FC } from 'react'
import type { ProjectRouterProps } from './projects.types'

export const ProjectFeature: FC = () => {
  const router = useRoute<ProjectRouterProps>()
  const navigation = useRootNavigation()
  const handleOpenTask = () =>
    navigation.navigate(Routes.Task, {
      taskId: 'taskId1',
    })

  useEffect(() => {
    navigation.setOptions({ title: router.params.projectId })
  }, [navigation, router])

  return (
    <View>
      <Text>Project</Text>
      <Text>{router.params.projectId}</Text>
      <Button title={'Open task'} onPress={handleOpenTask} />
    </View>
  )
}
