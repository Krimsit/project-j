import { Button } from './AppProjectButton.styles'

import type { FC } from 'react'

export const AppProjectButton: FC = () => {
  const handleOpenProjectForm = () => console.log('Open project form')

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
