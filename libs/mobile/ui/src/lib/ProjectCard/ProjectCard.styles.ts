import styled from 'styled-components'
import { View } from 'react-native'
import { Card as BaseCard } from 'react-native-paper'

export const Card = styled(BaseCard)`
  padding: 10px;
`

export const Info = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 5px;
`

export const Title = styled(BaseCard.Title)`
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

export const Content = styled(BaseCard.Content)`
  margin-top: 20px;
`
