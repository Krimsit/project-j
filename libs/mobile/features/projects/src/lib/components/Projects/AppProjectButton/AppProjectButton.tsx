import { useRootNavigation } from '@mobile/hooks'
import { Routes } from '@mobile/models'

import { Button } from './AppProjectButton.styles'

import type { FC } from 'react'

export const AppProjectButton: FC = () => {
  const navigation = useRootNavigation()
  const handleOpenProjectForm = () =>
    navigation.navigate(Routes.ProjectForm, {
      defaultValues: undefined,
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
