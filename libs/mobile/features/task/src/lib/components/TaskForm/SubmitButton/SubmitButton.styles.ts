import styled from 'styled-components'
import { View } from 'react-native'
import { Button as BaseButton } from 'react-native-paper'

export const Container = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const Button = styled(BaseButton)`
  text-transform: uppercase;
`
