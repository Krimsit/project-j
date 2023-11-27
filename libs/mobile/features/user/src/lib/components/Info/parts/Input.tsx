import { useState, useEffect } from 'react'
import { IconButton } from 'react-native-paper'

import { TextInput, InputContainer } from './common.styles'

import type { FC } from 'react'
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import type { InputProps } from './common.types'

export const TextField: FC<InputProps> = ({
  placeholder,
  label,
  onEdit,
  defaultValue,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [value, setValue] = useState<string>(defaultValue)
  const icon = isEdit ? 'content-save' : 'square-edit-outline'

  const handleToggleEdit = () => {
    if (isEdit) {
      onEdit(value)
      setIsEdit(false)
    } else {
      setIsEdit(true)
    }
  }

  const handleChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(text)
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <InputContainer>
      <TextInput
        mode={'outlined'}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        label={label}
        editable={isEdit}
        focusable={isEdit}
      />
      <IconButton icon={icon} size={20} onPress={handleToggleEdit} />
    </InputContainer>
  )
}
