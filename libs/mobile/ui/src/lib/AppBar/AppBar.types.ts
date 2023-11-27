import type { ReactNode } from 'react'

export type AppBarProps = {
  withBackButton?: boolean
  title?: string
  rightContent?: ReactNode
  onBack?: () => void
}
