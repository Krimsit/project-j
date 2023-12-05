export type StyledIcon = {
  $color: string
}

export type CardProps = {
  icon: string
  color: string
  count: number
  onPress?: () => void
  title: string
  loading?: boolean
}
