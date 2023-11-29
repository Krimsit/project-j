import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Banner, Button } from 'react-native-paper'
import { registrationValidationSchema } from '@shared/validations'

import { useRegistrationMutation } from '../../hooks'
import { defaultRegistrationFormValues } from '../../constants'

import { Upload, TextField } from './parts'

import type { FC } from 'react'
import type { RegistrationForm } from '@shared/models'

export const Registration: FC = () => {
  const [isVisibleError, setIsVisibleError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [submit, { loading }] = useRegistrationMutation({
    setIsVisibleError,
    setErrorMessage,
  })
  const methods = useForm<RegistrationForm>({
    mode: 'onChange',
    defaultValues: defaultRegistrationFormValues,
    resolver: zodResolver(registrationValidationSchema),
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
      <Upload />
      <TextField
        name={'email'}
        label={'Email'}
        placeholder={'Enter email'}
        inputMode={'email'}
      />
      <TextField
        name={'username'}
        label={'Username'}
        placeholder={'Enter username'}
      />
      <TextField
        name={'first_name'}
        label={'First name'}
        placeholder={'Enter first name'}
      />
      <TextField
        name={'last_name'}
        label={'Last name'}
        placeholder={'Enter last name'}
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
        Registration
      </Button>
    </FormProvider>
  )
}
