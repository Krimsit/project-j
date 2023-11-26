import {
  TextField,
  Row,
  DatePicker,
  UserSelect,
  PrioritySelect,
  Upload,
} from './parts'
import { Container } from './Form.styles'

import type { FC } from 'react'
import type { FormProps } from './Form.types'

export const Form: FC<FormProps> = ({ isEdit }) => (
  <Container>
    <TextField
      name={'task_name'}
      label={'Task name'}
      placeholder={'Enter task name'}
    />
    <Row title={'Due date'}>
      <DatePicker />
    </Row>
    <Row title={'Assigner'}>
      <UserSelect />
    </Row>
    <Row title={'Priority'}>
      <PrioritySelect />
    </Row>
    {!isEdit && <Upload />}
    <TextField
      name={'description'}
      label={'Description'}
      placeholder={'Enter task description'}
      isTextarea
    />
  </Container>
)
