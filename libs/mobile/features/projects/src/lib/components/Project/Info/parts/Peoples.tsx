import { useState } from 'react'
import { Avatar, IconButton } from 'react-native-paper'

import { UserSelect } from '../../../UserSelect'

import { PeoplesContainer } from './common.styles'

import type { FC } from 'react'
import type { User } from '@shared/models'
import type { PeoplesProps } from './common.types'

export const Peoples: FC<PeoplesProps> = ({ peoples }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleApply = (users: User[]) => {
    console.log(users)
  }

  return (
    <PeoplesContainer>
      {peoples?.map((item) => (
        <Avatar.Image
          key={String(item._id)}
          source={{
            uri: 'https://fastly.picsum.photos/id/507/700/700.jpg?hmac=Zn0zn8AItI9nqo8ZPoYW3AmOQ1o_nkZ_zkcHlNF-Un4',
          }}
          size={32}
        />
      ))}
      <IconButton
        icon={'account-multiple-plus'}
        mode={'contained'}
        size={16}
        onPress={handleOpen}
      />
      <UserSelect isOpen={isOpen} onApply={handleApply} onClose={handleClose} />
    </PeoplesContainer>
  )
}
