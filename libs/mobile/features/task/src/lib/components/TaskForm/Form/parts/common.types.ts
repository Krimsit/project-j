import type { ReactNode } from 'react'
import type { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar'

export type RowProps = {
  title: string
  children: ReactNode
}

export type TextFieldProps = {
  name: string
  isTextarea?: boolean
  placeholder?: string
  label: string
}

export type DatePickerChange =
  | {
      date: CalendarDate
    }
  | {
      startDate: CalendarDate
      endDate: CalendarDate
    }
