import { View } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { TextInput, HelperText } from 'react-native-paper'

import type { FC } from 'react'
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import type { TextFieldProps } from './common.types'

export const TextField: FC<TextFieldProps> = ({
  name,
  isTextarea,
  placeholder,
  label,
}) => {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const value = getValues(name) as string
  const error = errors[name]
  const numberOfLines = isTextarea ? 5 : 1

  const handleChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(name, text)
  }

  return (
    <View>
      <TextInput
        mode={'outlined'}
        onChange={handleChange}
        value={value}
        multiline={isTextarea}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        label={label}
      />
      <HelperText type={'error'} visible={Boolean(error)}>
        {String(error?.message)}
      </HelperText>
    </View>
  )
}
