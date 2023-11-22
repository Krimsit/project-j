import styled from 'styled-components'
import { View } from 'react-native'
import { Card } from 'react-native-paper'

export const Info = styled(View)`
  flex: 0.5;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 5px;
`

export const Title = styled(Card.Title)`
  display: flex;
  align-items: center;
`

export const InfoChip = styled(View)`
  padding: 5px 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: ${({ theme }) => theme.colors.primaryContainer};
  width: auto;
  align-self: flex-start;
`

export const Content = styled(Card.Content)`
  margin-top: 20px;
`
