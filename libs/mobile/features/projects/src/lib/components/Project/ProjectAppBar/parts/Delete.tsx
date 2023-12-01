import { useState, Fragment } from 'react'
import { Menu, Dialog, Text, Button, Portal } from 'react-native-paper'

import { useDeleteProjectMutation } from '../../../../hook'

import type { FC } from 'react'
import type { MenuItemProps } from './common.types'

export const Delete: FC<MenuItemProps> = ({ onClose, data, navigation }) => {
  const [deleteProject, { loading }] = useDeleteProjectMutation({ navigation })
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const handleOpenDelete = () => setIsOpenDelete(true)

  const handleCloseDelete = () => {
    setIsOpenDelete(false)
    onClose()
  }

  const handleDelete = () => {
    void deleteProject({ variables: { value: data._id } }).then(() => {
      handleCloseDelete()
      onClose()
    })
  }

  return (
    <Fragment>
      <Menu.Item
        leadingIcon={'trash-can'}
        title={'Delete'}
        onPress={handleOpenDelete}
      />
      <Portal>
        <Dialog visible={isOpenDelete}>
          <Dialog.Content>
            <Text variant={'bodyMedium'}>
              Are you sure you want to delete the project?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode={'outlined'}
              onPress={handleCloseDelete}
              disabled={loading}
            >
              No
            </Button>
            <Button
              mode={'contained'}
              onPress={handleDelete}
              disabled={loading}
              loading={loading}
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Fragment>
  )
}
