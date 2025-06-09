import { Modal, TextInput, Flex, Button, Textarea, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { createProjectSchema } from '@shared/types'
import { useProject, useUpdateProject } from '@dto/project'

import type { FC } from 'react'
import type { UpdateProjectRequest } from '@shared/types'

export type UpdateModalProps = {
  isOpen: boolean
  onClose: () => void
}

const UpdateModal: FC<UpdateModalProps> = ({ isOpen, onClose }) => {
  const { data } = useProject()
  const { mutateAsync, isPending } = useUpdateProject()
  const form = useForm<UpdateProjectRequest>({
    mode: 'uncontrolled',
    initialValues: {
      name: data?.name,
      description: data?.description,
    },
    validate: zodResolver(createProjectSchema),
  })

  const handleSuccess = async (values: UpdateProjectRequest) => {
    await mutateAsync(values)
    onClose()
  }

  return (
    <Modal opened={isOpen} onClose={onClose} title={'Изменить информацию'}>
      <form onSubmit={form.onSubmit(handleSuccess)}>
        <Flex direction={'column'} gap={'md'}>
          <TextInput
            key={form.key('name')}
            label={'Название'}
            placeholder={'Мой проект'}
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Textarea
            key={form.key('description')}
            label={'Описание'}
            placeholder={'Описание проекта'}
            {...form.getInputProps('description')}
          />
          <Group gap={'md'} justify={'flex-end'}>
            <Button onClick={onClose} variant={'subtle'}>
              Отмена
            </Button>
            <Button type={'submit'} loading={isPending}>
              Обновить
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  )
}

export default UpdateModal
