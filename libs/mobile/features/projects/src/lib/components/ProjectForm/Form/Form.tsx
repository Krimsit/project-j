import { Upload, TextField, UserSelect } from './parts'
import { Container } from './Form.styles'

import type { FC } from 'react'

export const Form: FC = () => (
  <Container>
    <Upload />
    <TextField name={'name'} label={'Project name'} />
    <UserSelect />
  </Container>
)
