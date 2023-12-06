import { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { ApiActions, useApiDispatch } from '@mobile/api-provider'

import { useIsValidSecretKeyMutation } from '../hooks'

import { Container } from './Form.styles'

import type { FC } from 'react'

export const Form: FC = () => {
  const dispatch = useApiDispatch()
  const [uri, setUri] = useState<string>('')
  const [secretKey, setSecretKey] = useState<string>('')
  const [submit, { loading }] = useIsValidSecretKeyMutation(uri)
  const disabled = (!uri && !secretKey) || loading

  const handleSubmit = async () => {
    dispatch({ type: ApiActions.Set, uri })
    await submit({ variables: { value: secretKey } })
  }

  return (
    <Container>
      <TextInput
        label={'URI'}
        placeholder={'Enter URI'}
        onChangeText={setUri}
        value={uri}
      />
      <TextInput
        label={'Secret key'}
        placeholder={'Enter secret key'}
        onChangeText={setSecretKey}
        value={secretKey}
      />
      <Button
        mode={'contained'}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPress={handleSubmit}
        disabled={disabled}
        loading={loading}
        uppercase
      >
        Submit
      </Button>
    </Container>
  )
}
