import styled from 'styled-components'
import { View } from 'react-native'

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => `${theme.roundness}px`};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 10px;
`
