import { View } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { TextInput, HelperText } from 'react-native-paper'

import type { FC } from 'react'
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import type { TextFieldProps } from './common.types'

export const TextField: FC<TextFieldProps> = ({ name, label }) => {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const value = getValues(name) as string
  const error = errors[name]

  const handleChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(name, text)
  }

  return (
    <View>
      <HelperText type={'info'}>{label}</HelperText>
      <TextInput
        label={label}
        mode={'outlined'}
        onChange={handleChange}
        value={value}
      />
      <HelperText type={'error'} visible={Boolean(error)}>
        {String(error?.message)}
      </HelperText>
    </View>
  )
}
