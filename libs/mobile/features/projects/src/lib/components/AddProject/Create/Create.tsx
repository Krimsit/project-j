import { useFormContext } from 'react-hook-form'

import { Container, Button } from './Create.styles'

import type { FC } from 'react'
import type { CreateProps } from './Create.types'

export const Create: FC<CreateProps> = ({ isEdit }) => {
  const { getValues } = useFormContext()
  const title = isEdit ? 'UPDATE PROJECT' : 'CREATE PROJECT'

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
