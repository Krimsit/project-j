import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Banner } from 'react-native-paper'
import { useNavigation } from '@mobile/hooks'
import { projectValidationSchema } from '@shared/validations'

import { Form } from './Form'
import { Create } from './Create'
import { Container } from './ProjectForm.styles'
import { defaultFormValues } from './ProjectForm.constants'

import type { FC } from 'react'
import type { ProjectFormRouterProps } from '../../types'
import type { ProjectForm as ProjectFormType } from '@shared/models'

export const ProjectForm: FC = () => {
  const router = useRoute<ProjectFormRouterProps>()
  const navigation = useNavigation()
  const [isVisibleError, setIsVisibleError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const isEdit = router.params.defaultValues
  const methods = useForm<ProjectFormType>({
    defaultValues: router.params.defaultValues
      ? {
          image: router.params.defaultValues.image,
          name: router.params.defaultValues.name,
          users: [],
        }
      : defaultFormValues,
    resolver: zodResolver(projectValidationSchema),
  })
  const { setValue } = methods

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edit project' : 'New project',
    })
  }, [isEdit, navigation, router])

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
      tabBarVisible: false,
    })
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
        tabBarVisible: false,
      })
  }, [navigation])

  useEffect(() => {
    const usersIds =
      router.params.defaultValues?.users.map((user) => user._id) ?? []

    setValue('users', usersIds)
  }, [router.params.defaultValues])

  return (
    <FormProvider {...methods}>
      <Container>
        <Banner visible={isVisibleError}>{errorMessage}</Banner>
        <Form />
        <Create
          isEdit={Boolean(isEdit)}
          setErrorMessage={setErrorMessage}
          setIsVisibleError={setIsVisibleError}
        />
      </Container>
    </FormProvider>
  )
}
