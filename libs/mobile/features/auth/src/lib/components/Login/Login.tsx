import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Banner } from 'react-native-paper'
import { loginValidationSchema } from '@shared/validations'

import { useLoginMutation } from '../../hooks'
import { defaultLoginFormValues } from '../../constants'

import { TextField } from './parts'

import type { FC } from 'react'
import type { LoginForm } from '@shared/models'

export const Login: FC = () => {
  const [isVisibleError, setIsVisibleError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [submit, { loading }] = useLoginMutation({
    setIsVisibleError,
    setErrorMessage,
  })
  const methods = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: defaultLoginFormValues,
    resolver: zodResolver(loginValidationSchema),
  })
  const {
    handleSubmit: onSubmit,
    formState: { isValid },
  } = methods
  const handleSubmit = onSubmit((data) =>
    submit({ variables: { value: data } }),
  )

  return (
    <FormProvider {...methods}>
      <Banner visible={isVisibleError}>{errorMessage}</Banner>
      <TextField
        name={'email'}
        label={'Email'}
        placeholder={'Enter email'}
        inputMode={'email'}
      />
      <TextField
        name={'password'}
        label={'Password'}
        placeholder={'Enter password'}
        secureTextEntry
      />
      <Button
        mode={'contained'}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPress={handleSubmit}
        disabled={!isValid || loading}
        loading={loading}
      >
        Login
      </Button>
    </FormProvider>
  )
}
