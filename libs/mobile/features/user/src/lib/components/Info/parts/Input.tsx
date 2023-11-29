import { useState, useEffect } from 'react'

import { TextInput } from './common.styles'

import type { FC } from 'react'
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import type { InputProps } from './common.types'

export const TextField: FC<InputProps> = ({
  placeholder,
  label,
  defaultValue,
}) => {
  const [value, setValue] = useState<string>(defaultValue)

  const handleChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(text)
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <TextInput
      mode={'outlined'}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      label={label}
      editable={false}
    />
  )
}
