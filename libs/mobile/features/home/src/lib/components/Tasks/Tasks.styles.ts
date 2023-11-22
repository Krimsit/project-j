import styled from 'styled-components'
import { View } from 'react-native'

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Title = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const List = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 25px;
`
