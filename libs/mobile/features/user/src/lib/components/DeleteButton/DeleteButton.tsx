import { Fragment, useState } from 'react'
import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'

import { useDeleteUserMutation } from '../../hooks'

import type { FC } from 'react'

export const DeleteButton: FC = () => {
  const dispatch = useAuthDispatch()
  const [deleteUser, { loading }] = useDeleteUserMutation()
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const handleOpenDelete = () => setIsOpenDelete(true)

  const handleCloseDelete = () => {
    setIsOpenDelete(false)
  }

  const handleDelete = () => {
    void deleteUser().then(() => {
      handleCloseDelete()
      dispatch({ type: AuthActions.SignOut })
    })
  }

  return (
    <Fragment>
      <Button icon={'trash-can'} mode={'contained'} onPress={handleOpenDelete}>
        Delete
      </Button>
      <Portal>
        <Dialog visible={isOpenDelete} onDismiss={handleCloseDelete}>
          <Dialog.Content>
            <Text variant={'bodyMedium'}>
              Are you sure you want to delete your account?
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
