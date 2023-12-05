import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Banner } from 'react-native-paper'
import { useRootNavigation } from '@mobile/hooks'
import { taskValidationSchema } from '@shared/validations'

import { Form } from './Form'
import { SubmitButton } from './SubmitButton'
import { Container } from './TaskForm.styles'

import type { FC } from 'react'
import type { TaskForm as TaskFormType } from '@shared/models'
import type { TaskFormRouterProps } from './TaskForm.types'

export const TaskForm: FC = () => {
  const router = useRoute<TaskFormRouterProps>()
  const navigation = useRootNavigation()
  const [isVisibleError, setIsVisibleError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const isEdit = router.params.defaultValues
  const methods = useForm<TaskFormType>({
    mode: 'onChange',
    defaultValues: router.params.defaultValues
      ? {
          project_id: router.params.project_id,
          name: router.params.defaultValues.name,
          dueData: router.params.defaultValues.dueDate,
          priority: router.params.defaultValues.priority,
          assigner: router.params.defaultValues.assigner,
          attachments: [],
        }
      : {
          project_id: router.params.project_id,
          attachments: [],
        },
    resolver: zodResolver(taskValidationSchema),
  })
  const { setValue } = methods

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edit task' : 'New task',
    })
  }, [isEdit, navigation, router])

  useEffect(() => {
    setValue('project_id', router.params.project_id)
  }, [router.params.project_id, setValue])

  return (
    <FormProvider {...methods}>
      <Container>
        <Banner visible={isVisibleError}>{errorMessage}</Banner>
        <Form isEdit={Boolean(isEdit)} />
        <SubmitButton
          isEdit={Boolean(isEdit)}
          setErrorMessage={setErrorMessage}
          setIsVisibleError={setIsVisibleError}
        />
      </Container>
    </FormProvider>
  )
}
