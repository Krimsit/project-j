import { useState } from 'react'
import { IconButton } from 'react-native-paper'
import { useUserQuery } from '@mobile/hooks'

import { useCreateTaskComment, useTaskQuery } from '../../../../hooks'

import { InputContainer, TextInput } from './common.styles'

import type { FC } from 'react'
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import type { TaskCommentForm } from '@shared/models'

export const Input: FC = () => {
  const [createComment, { loading }] = useCreateTaskComment()
  const { data: user } = useUserQuery()
  const { data: task } = useTaskQuery()
  const [value, setValue] = useState<string>('')
  const disabled = !value || loading

  const handleChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(text)
  }

  const handleSend = () => {
    if (user && task) {
      const data: TaskCommentForm = {
        message: value,
        user_id: user.currentUser._id,
        task_id: task.getTask._id,
      }

      void createComment({
        variables: {
          value: data,
        },
      }).then(() => setValue(''))
    }
  }

  return (
    <InputContainer>
      <TextInput
        mode={'outlined'}
        onChange={handleChange}
        value={value}
        placeholder={'Write your comment'}
      />
      <IconButton
        size={30}
        icon={'send-circle'}
        onPress={handleSend}
        disabled={disabled}
      />
    </InputContainer>
  )
}
