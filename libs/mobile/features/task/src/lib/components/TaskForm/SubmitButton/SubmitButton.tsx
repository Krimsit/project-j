import { useRoute } from '@react-navigation/native'
import { useFormContext } from 'react-hook-form'

import { useCreateTaskMutation, useUpdateTaskMutation } from '../../../hooks'

import { Container, Button } from './SubmitButton.styles'

import type { FC } from 'react'
import type { TaskForm } from '@shared/models'
import type { SubmitButtonProps } from './SubmitButton.types'
import type { TaskFormRouterProps } from '../../../types'

export const SubmitButton: FC<SubmitButtonProps> = ({
  isEdit,
  setIsVisibleError,
  setErrorMessage,
}) => {
  const router = useRoute<TaskFormRouterProps>()
  const [createTask, { loading: createTaskLoading }] = useCreateTaskMutation({
    setErrorMessage,
    setIsVisibleError,
  })
  const [updateTask, { loading: updateTaskLoading }] = useUpdateTaskMutation({
    setErrorMessage,
    setIsVisibleError,
  })
  const {
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useFormContext<TaskForm>()
  const title = isEdit ? 'UPDATE TASK' : 'CREATE TASK'
  const isLoading = createTaskLoading || updateTaskLoading
  const isDisabled = isLoading || !isValid
  const handleCreate = handleSubmit(() => {
    const data = getValues()

    if (isEdit) {
      void updateTask({
        variables: {
          taskId: router.params.defaultValues?._id || '',
          value: {
            ...data,
            project_id: router.params.project_id || '',
          },
        },
      })
    } else {
      void createTask({
        variables: {
          value: {
            ...data,
            project_id: router.params.project_id || '',
          },
        },
      })
    }
  })

  return (
    <Container>
      <Button
        mode={'contained-tonal'}
        onPress={handleCreate}
        loading={isLoading}
        disabled={isDisabled}
      >
        {title}
      </Button>
    </Container>
  )
}
