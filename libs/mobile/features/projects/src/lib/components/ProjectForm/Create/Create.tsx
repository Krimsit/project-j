import { useRoute } from '@react-navigation/native'
import { useFormContext } from 'react-hook-form'

import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from '../../../hooks'

import { Container, Button } from './Create.styles'

import type { FC } from 'react'
import type { ProjectForm } from '@shared/models'
import type { CreateProps } from './Create.types'
import type { ProjectFormRouterProps } from '../../../types'

export const Create: FC<CreateProps> = ({
  isEdit,
  setErrorMessage,
  setIsVisibleError,
}) => {
  const router = useRoute<ProjectFormRouterProps>()
  const [createProject, { loading: createProjectLoading }] =
    useCreateProjectMutation({ setErrorMessage, setIsVisibleError })
  const [updateProject, { loading: updateProjectLoading }] =
    useUpdateProjectMutation({ setErrorMessage, setIsVisibleError })
  const {
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useFormContext<ProjectForm>()
  const title = isEdit ? 'UPDATE PROJECT' : 'CREATE PROJECT'
  const isLoading = createProjectLoading || updateProjectLoading
  const isDisabled = isLoading || !isValid
  const handleCreate = handleSubmit(() => {
    const data = getValues()

    if (isEdit) {
      void updateProject({
        variables: {
          projectId: router.params.defaultValues?._id || '',
          value: data,
        },
      })
    } else {
      void createProject({ variables: { value: data } })
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
