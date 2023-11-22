import styled from 'styled-components'
import { View } from 'react-native'
import { Card as BaseCard } from 'react-native-paper'

export const Title = styled(BaseCard.Title)`
  display: flex;
  align-items: center;
`

export const Info = styled(BaseCard.Content)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
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

export const StatusChip = styled(InfoChip)`
  padding: 5px;
`

export const Footer = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
