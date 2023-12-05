import { View } from 'react-native'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput, HelperText } from 'react-native-paper'

import type { FC } from 'react'
import type { TextFieldProps } from './common.types'
import type { TaskForm } from '@shared/models'

export const TextField: FC<TextFieldProps> = ({ name, label, placeholder }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TaskForm>()
  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <View>
          <TextInput
            mode={'outlined'}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            label={label}
            placeholder={placeholder}
          />
          <HelperText type={'error'} visible={Boolean(error)}>
            {String(error?.message)}
          </HelperText>
        </View>
      )}
    />
  )
}
