import { View } from 'react-native'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput, HelperText } from 'react-native-paper'

import type { FC } from 'react'
import type { ProjectForm } from '@shared/models'
import type { TextFieldProps } from './common.types'

export const TextField: FC<TextFieldProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectForm>()
  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <View>
          <HelperText type={'info'}>{label}</HelperText>
          <TextInput
            mode={'outlined'}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
          />
          <HelperText type={'error'} visible={Boolean(error)}>
            {String(error?.message)}
          </HelperText>
        </View>
      )}
    />
  )
}
