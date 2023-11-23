import { useFormContext } from 'react-hook-form'

import { Container, Button } from './Create.styles'

import type { FC } from 'react'

export const Create: FC = () => {
  const { getValues } = useFormContext()

  const handleCreate = () => {
    const values = getValues()

    console.log(values)
  }

  return (
    <Container>
      <Button mode={'contained-tonal'} onPress={handleCreate}>
        CREATE PROJECT
      </Button>
    </Container>
  )
}
