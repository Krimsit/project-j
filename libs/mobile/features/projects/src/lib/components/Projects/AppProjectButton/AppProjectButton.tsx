import { useNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { Button } from './AppProjectButton.styles'

import type { FC } from 'react'

export const AppProjectButton: FC = () => {
  const navigation = useNavigation()
  const handleOpenProjectForm = () =>
    navigation.navigate(Routes.Projects, {
      screen: Routes.AddProject,
    })

  return (
    <Button
      mode={'contained'}
      onPress={handleOpenProjectForm}
      icon={'playlist-plus'}
    >
      Add project
    </Button>
  )
}
