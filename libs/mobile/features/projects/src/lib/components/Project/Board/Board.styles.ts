import styled from 'styled-components'
import { View } from 'react-native'
import { Divider as BaseDivider } from 'react-native-paper'

export const Container = styled(View)`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  gap: 15px;
  flex: 1;
`

export const Divider = styled(BaseDivider)`
  width: 1px;
  height: 100%;
`
