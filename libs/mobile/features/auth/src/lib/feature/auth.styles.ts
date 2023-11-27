import styled from 'styled-components'
import { View } from 'react-native'
import { Card as BaseCard } from 'react-native-paper'

export const Container = styled(View)`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Card = styled(BaseCard)`
  display: flex;
  flex-direction: column;
`

export const Content = styled(BaseCard.Content)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
