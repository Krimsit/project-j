import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, TextInput } from 'react-native-paper'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'

import { defaultLoginFormValues } from '../../constants'

import type { FC } from 'react'
import type { LoginForm } from '../../types'

export const Login: FC = () => {
  const dispatch = useAuthDispatch()
  const {
    control,
    handleSubmit: onSubmit,
    formState: { isValid },
  } = useForm<LoginForm>({
    defaultValues: defaultLoginFormValues,
  })

  const submit = (data: LoginForm) => {
    console.log(data)
    dispatch({ type: AuthActions.SignIn, token: 'user-token' })
  }
  const handleSubmit = onSubmit(submit)

  return (
    <Fragment>
      <Controller
        control={control}
        name={'email'}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            label={'Email'}
            placeholder={'Enter email'}
            mode={'outlined'}
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name={'password'}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            label={'Password'}
            placeholder={'Enter password'}
            mode={'outlined'}
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            secureTextEntry
          />
        )}
      />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button mode={'contained'} onPress={handleSubmit} disabled={!isValid}>
        Login
      </Button>
    </Fragment>
  )
}
