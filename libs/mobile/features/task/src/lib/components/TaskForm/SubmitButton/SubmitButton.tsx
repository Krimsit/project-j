import { useFormContext } from 'react-hook-form'

import { Container, Button } from './SubmitButton.styles'

import type { FC } from 'react'
import type { SubmitButtonProps } from './SubmitButton.types'

export const SubmitButton: FC<SubmitButtonProps> = ({ isEdit }) => {
  const { getValues } = useFormContext()
  const title = isEdit ? 'UPDATE TASK' : 'CREATE TASK'

  const handleCreate = () => {
    const values = getValues()

    console.log(values)
  }

  return (
    <Container>
      <Button mode={'contained-tonal'} onPress={handleCreate}>
        {title}
      </Button>
    </Container>
  )
}
