import { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { FormProvider, useForm } from 'react-hook-form'
import { useRootNavigation } from '@mobile/hooks'

import { Form } from './Form'
import { SubmitButton } from './SubmitButton'
import { Container } from './TaskForm.styles'

import type { FC } from 'react'
import type { TaskFormRouterProps } from './TaskForm.types'

export const TaskForm: FC = () => {
  const router = useRoute<TaskFormRouterProps>()
  const navigation = useRootNavigation()
  const isEdit = router.params.defaultValues
  const methods = useForm({
    defaultValues: isEdit
      ? {
          project_id: router.params.project_id,
          _id: router.params.defaultValues?._id,
        }
      : {
          project_id: router.params.project_id,
        },
  })

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edit task' : 'New task',
    })
  }, [navigation, router])

  return (
    <FormProvider {...methods}>
      <Container>
        <Form isEdit={Boolean(isEdit)} />
        <SubmitButton isEdit={Boolean(isEdit)} />
      </Container>
    </FormProvider>
  )
}
