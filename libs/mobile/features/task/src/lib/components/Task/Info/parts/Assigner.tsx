import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Chip, Avatar } from 'react-native-paper'
import { useAllUsersQuery } from '@mobile/hooks'
import { Select } from '@mobile/ui'

import { useTaskQuery, useUpdateTaskAssignerMutation } from '../../../../hooks'

import { Row } from './Row'

import type { FC } from 'react'
import type { User } from '@shared/models'

export const Assigner: FC = () => {
  const { data } = useTaskQuery()
  const { data: allUsers } = useAllUsersQuery()
  const [updateAssigner, { loading: updateAssignerLoading }] =
    useUpdateTaskAssignerMutation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checkedUser, setCheckedUser] = useState<User | undefined>(undefined)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleApply = (user?: User) => {
    setCheckedUser(user)

    if (user) {
      void updateAssigner({
        variables: {
          taskId: data?.getTask._id ?? '',
          value: {
            assigner: user?._id,
          },
        },
      })
    }
  }

  useEffect(() => {
    setCheckedUser(data?.getTask.assigner ?? undefined)
  }, [data?.getTask.assigner])

  return (
    <Row title={'Assigner'}>
      <View>
        <Chip
          mode={'outlined'}
          avatar={
            <Avatar.Image
              size={24}
              source={{
                uri: 'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
              }}
            />
          }
          onPress={handleOpen}
        >
          {checkedUser?.username}
        </Chip>
        <Select<User>
          isOpen={isOpen}
          onApply={handleApply}
          onClose={handleClose}
          values={allUsers?.getAllUsers ?? []}
          valueField={'_id'}
          labelField={'username'}
          searchField={'username'}
          value={checkedUser}
          loading={updateAssignerLoading}
        />
      </View>
    </Row>
  )
}
