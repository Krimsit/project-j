import { useEffect, useState } from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useNavigation, useRootNavigation } from '@mobile/hooks'
import { AppBar as BaseAppBar } from '@mobile/ui'
import { Routes } from '@mobile/models'

import { useProjectQuery } from '../../../hooks'

import { Edit, Delete } from './parts'

import type { FC } from 'react'

export const ProjectAppBar: FC = () => {
  const navigation = useNavigation()
  const rootNavigation = useRootNavigation()
  const { data } = useProjectQuery()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleCloseProject = () =>
    navigation.navigate(Routes.Projects, {
      screen: Routes.Projects,
    })

  useEffect(() => {
    navigation.setOptions({ title: data?.getProject.name ?? 'Loading...' })
  }, [data?.getProject.name, navigation])

  if (!data) {
    return null
  }

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
          <Edit
            navigation={rootNavigation}
            onClose={handleClose}
            data={data.getProject}
          />
          <Delete
            navigation={navigation}
            onClose={handleClose}
            data={data.getProject}
          />
        </Menu>
      }
      onBack={handleCloseProject}
      withBackButton
    />
  )
}
