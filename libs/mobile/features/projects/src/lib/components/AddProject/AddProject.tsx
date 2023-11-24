import { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigation } from '@mobile/hooks'

import { Form } from './Form'
import { Create } from './Create'
import { Container } from './AddProject.styles'

import type { FC } from 'react'
import type { AddProjectRouterProps } from './AddProject.types'

export const AddProject: FC = () => {
  const router = useRoute<AddProjectRouterProps>()
  const navigation = useNavigation()
  const isEdit = router.params.defaultValues
  const methods = useForm({
    defaultValues: isEdit
      ? {
          _id: router.params.defaultValues._id,
          image: router.params.defaultValues.image,
          project_name: router.params.defaultValues.name,
          users: router.params.defaultValues.selectedUsers,
        }
      : undefined,
  })

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Edit project' : 'New project',
    })
  }, [navigation, router])

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

  return (
    <FormProvider {...methods}>
      <Container>
        <Form />
        <Create isEdit={Boolean(isEdit)} />
      </Container>
    </FormProvider>
  )
}
