import { Divider } from 'react-native-paper'

import { TextField } from './parts'
import { Container } from './Info.styles'

import type { FC } from 'react'

export const Info: FC = () => {
  const handleEdit = (value: string) => {
    console.log(`edit ${value}`)
  }

  return (
    <Container>
      <TextField
        label={'Firstname'}
        placeholder={'Enter firstname'}
        defaultValue={'Andrey'}
        onEdit={handleEdit}
      />
      <Divider />
      <TextField
        label={'Lastname'}
        placeholder={'Enter lastname'}
        defaultValue={'Subbotin'}
        onEdit={handleEdit}
      />
    </Container>
  )
}
