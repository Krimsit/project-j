import type { TaskCardProps } from '@shared/models'

export type StyledColumnContainerProps = {
  $width: number
}

export type ColumnProps = {
  title: string
  cards: TaskCardProps[]
  color: string
}
