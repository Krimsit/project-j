import { View } from 'react-native'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { HelperText } from 'react-native-paper'
import RNDateTimePicker from '@react-native-community/datetimepicker'

import { Button } from './common.styles'

import type { FC } from 'react'
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import type { TaskForm } from '@shared/models'

export const DatePicker: FC = () => {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<TaskForm>()
  const [open, setOpen] = useState<boolean>(false)
  const value = getValues('dueData') as string
  const error = errors.dueData
  const text = value ? String(value) : 'Select date'
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirm = (_: DateTimePickerEvent, date?: Date) => {
    setValue('dueData', String(date), {
      shouldValidate: true,
    })
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
