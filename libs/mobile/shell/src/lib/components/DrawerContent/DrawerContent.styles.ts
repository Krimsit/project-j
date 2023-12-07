import styled from 'styled-components'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { View } from 'react-native'

export const Container = styled(DrawerContentScrollView)`
  background-color: ${({ theme }) => theme.colors.onPrimary};
  padding: 20px;
  flex: 1;
`

export const Content = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
`
