import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, TextInput } from 'react-native-paper'
import { AuthActions, useAuthDispatch } from '@mobile/auth-provider'

import { defaultRegistrationFormValues } from '../../constants'

import type { FC } from 'react'
import type { RegistrationForm } from '../../types'

export const Registration: FC = () => {
  const dispatch = useAuthDispatch()
  const {
    control,
    handleSubmit: onSubmit,
    formState: { isValid },
  } = useForm<RegistrationForm>({
    defaultValues: defaultRegistrationFormValues,
  })

  const submit = (data: RegistrationForm) => {
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
        name={'username'}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            label={'Username'}
            placeholder={'Enter username'}
            mode={'outlined'}
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name={'first_name'}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            label={'First name'}
            placeholder={'Enter first name'}
            mode={'outlined'}
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name={'last_name'}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            label={'Last name'}
            placeholder={'Enter last name'}
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
