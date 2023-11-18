import { Fragment } from 'react'
import { Text, Button } from 'react-native-paper'
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
    <Fragment>
      <Text>Projects</Text>
      <Button onPress={handleOpenProject}>Open project</Button>
    </Fragment>
  )
}
