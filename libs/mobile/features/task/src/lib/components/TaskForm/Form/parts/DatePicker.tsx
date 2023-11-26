import { View } from 'react-native'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { HelperText } from 'react-native-paper'
import RNDateTimePicker from '@react-native-community/datetimepicker'

import { Button } from './common.styles'

import type { FC } from 'react'
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker'

export const DatePicker: FC = () => {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const [open, setOpen] = useState<boolean>(false)
  const value = getValues('due_date') as string
  const error = errors.due_date
  const text = value ? String(value) : 'Select date'
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirm = (_: DateTimePickerEvent, date?: Date) => {
    setValue('due_date', date)
    handleClose()
  }

  return (
    <View>
      <Button icon={'calendar'} mode={'outlined'} onPress={handleOpen}>
        {text}
      </Button>
      {open && (
        <RNDateTimePicker
          mode="date"
          value={value ? new Date(value) : new Date()}
          onChange={handleConfirm}
          minimumDate={new Date()}
        />
      )}
      <HelperText type={'error'} visible={Boolean(error)}>
        {String(error?.message)}
      </HelperText>
    </View>
  )
}
