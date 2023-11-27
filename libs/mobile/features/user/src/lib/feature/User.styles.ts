import styled from 'styled-components'
import { View } from 'react-native'
import { Card } from 'react-native-paper'

export const Container = styled(View)`
  padding: 20px;
  flex: 1;
`

export const Content = styled(Card.Content)`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`
