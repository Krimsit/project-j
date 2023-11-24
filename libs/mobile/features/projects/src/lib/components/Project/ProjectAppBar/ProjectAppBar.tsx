import { useEffect, useState } from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useNavigation } from '@mobile/hooks'
import { AppBar as BaseAppBar } from '@mobile/ui'

import { Edit, Delete } from './parts'

import type { FC } from 'react'
import { Routes } from '@mobile/models'

export const ProjectAppBar: FC = () => {
  const navigation = useNavigation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleCloseProject = () =>
    navigation.navigate(Routes.Projects, {
      screen: Routes.AllProjects,
    })

  useEffect(() => {
    navigation.setOptions({ title: 'Project' })
  }, [navigation])

  return (
    <BaseAppBar
      title={'Project'}
      rightContent={
        <Menu
          visible={isOpen}
          onDismiss={handleClose}
          anchor={
            <Appbar.Action
              icon={'dots-vertical'}
              onPress={handleOpen}
              size={20}
            />
          }
        >
          <Edit navigation={navigation} onClose={handleClose} />
          <Delete onClose={handleClose} />
        </Menu>
      }
      onBack={handleCloseProject}
      withBackButton
    />
  )
}
