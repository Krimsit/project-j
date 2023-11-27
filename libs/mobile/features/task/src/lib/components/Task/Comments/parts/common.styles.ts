import styled from 'styled-components'
import { View } from 'react-native'
import { TextInput as BaseTextInput } from 'react-native-paper'

export const InputContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TextInput = styled(BaseTextInput)`
  flex: 1;
`
