import { useState } from 'react'
import { IconButton } from 'react-native-paper'

import { InputContainer, TextInput } from './common.styles'

import type { FC } from 'react'
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'

export const Input: FC = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(text)
  }

  const handleSend = () => {
    console.log(`Send message: ${value}`)
  }

  return (
    <InputContainer>
      <TextInput
        mode={'outlined'}
        onChange={handleChange}
        value={value}
        placeholder={'Write your comment'}
      />
      <IconButton
        size={30}
        icon={'send-circle'}
        onPress={handleSend}
        disabled={!value}
      />
    </InputContainer>
  )
}
