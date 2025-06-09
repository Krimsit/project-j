import { Modal, TextInput, Flex, Button, Textarea, Group } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { createTaskSchema } from '@shared/types'
import { useCreateTask } from '@dto/task'

import type { FC } from 'react'
import type { CreateTaskRequest } from '@shared/types'

export type CreateTaskModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({ isOpen, onClose }) => {
  const { mutateAsync, isPending } = useCreateTask()
  const form = useForm<CreateTaskRequest>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      dueDate: '',
    },
    validate: zodResolver(createTaskSchema),
  })

  const handleSuccess = async (values: CreateTaskRequest) => {
    await mutateAsync(values)
    onClose()
  }

  return (
    <Modal opened={isOpen} onClose={onClose} title={'Добавить задачу'}>
      <form onSubmit={form.onSubmit(handleSuccess)}>
        <Flex direction={'column'} gap={'md'}>
          <TextInput
            key={form.key('name')}
            label={'Название'}
            placeholder={'Новая задача'}
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Textarea
            key={form.key('description')}
            label={'Описание'}
            placeholder={'Описание задачи'}
            {...form.getInputProps('description')}
          />
          <DatePickerInput
            key={form.key('dueDate')}
            label={'Дата завершения'}
            placeholder={'Дата завершения задачи'}
            withAsterisk
            {...form.getInputProps('dueDate')}
          />
          <Group gap={'md'} justify={'flex-end'}>
            <Button onClick={onClose} variant={'subtle'}>
              Отмена
            </Button>
            <Button type={'submit'} loading={isPending}>
              Добавить
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  )
}

export default CreateTaskModal
