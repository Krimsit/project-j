import { FormProvider, useForm } from 'react-hook-form'

import { Form } from './Form'
import { Create } from './Create'
import { Container } from './AddProject.styles'

import type { FC } from 'react'

export const AddProject: FC = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <Container>
        <Form />
        <Create />
      </Container>
    </FormProvider>
  )
}
