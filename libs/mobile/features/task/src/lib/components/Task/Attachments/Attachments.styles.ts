import styled from 'styled-components'
import { View, Image as BaseImage } from 'react-native'

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

export const Images = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`

export const Image = styled(BaseImage)`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => `${theme.roundness}px`};
`
