import { Upload, TextField, UserSelect } from './parts'
import { Container } from './Form.styles'

import type { FC } from 'react'

export const Form: FC = () => (
  <Container>
    <Upload />
    <TextField name={'project_name'} label={'Project name'} />
    <UserSelect />
  </Container>
)
