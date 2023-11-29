import { Divider } from 'react-native-paper'
import { useUserQuery } from '@mobile/hooks'

import { TextField } from './parts'
import { Container } from './Info.styles'

import type { FC } from 'react'

export const Info: FC = () => {
  const { data } = useUserQuery()

  if (!data) {
    return null
  }

  const {
    currentUser: { email, last_name, first_name },
  } = data

  return (
    <Container>
      <TextField
        label={'Firstname'}
        placeholder={'Enter firstname'}
        defaultValue={email}
      />
      <Divider />
      <TextField
        label={'Lastname'}
        placeholder={'Enter lastname'}
        defaultValue={last_name}
      />
      <Divider />
      <TextField
        label={'Lastname'}
        placeholder={'Enter lastname'}
        defaultValue={first_name}
      />
    </Container>
  )
}
