import styled from 'styled-components'
import { View } from 'react-native'

export const Content = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.onPrimary};
`

export const List = styled(View)`
  display: flex;
  flex-direction: column;
`

export const Footer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
`
