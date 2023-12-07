import type { Task } from '@shared/models'

export type StyledColumnContainerProps = {
  $width: number
}

export type ColumnProps = {
  title: string
  cards: Task[]
}
