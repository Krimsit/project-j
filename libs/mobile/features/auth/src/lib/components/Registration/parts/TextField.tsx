import { View } from 'react-native'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput, HelperText } from 'react-native-paper'

import type { FC } from 'react'
import type { RegistrationForm } from '@shared/models'
import type { TextFieldProps } from './common.types'

export const TextField: FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  secureTextEntry,
  inputMode = 'text',
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegistrationForm>()
  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <View>
          <TextInput
            label={label}
            placeholder={placeholder}
            mode={'outlined'}
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            inputMode={inputMode}
          />
          <HelperText visible={Boolean(error)} type={'error'}>
            {error?.message}
          </HelperText>
        </View>
      )}
    />
  )
}
