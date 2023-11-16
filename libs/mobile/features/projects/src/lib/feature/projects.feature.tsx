import { View, Text, Button } from 'react-native'
import { useNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import type { FC } from 'react'

export const ProjectsFeature: FC = () => {
  const navigation = useNavigation()
  const handleOpenProject = () =>
    navigation.navigate(Routes.Projects, {
      screen: Routes.Project,
      params: { projectId: 'projectScreenId' },
    })

  return (
    <View>
      <Text>Projects</Text>
      <Button title={'Open project'} onPress={handleOpenProject} />
    </View>
  )
}
