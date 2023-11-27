import styled from 'styled-components'
import { View } from 'react-native'

export const Container = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export const TextContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const StatusChip = styled(View)`
  padding: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: ${({ theme }) => theme.colors.primaryContainer};
  width: auto;
  align-self: flex-start;
`
