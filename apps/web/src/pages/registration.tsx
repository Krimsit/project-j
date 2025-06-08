import { Fragment, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Title,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  FileButton,
  Avatar,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { registrationRequestScheme } from '@shared/types'
import { useUploadFile } from '@dto/files'
import { useRegistration } from '@dto/auth'

import type { FC } from 'react'
import type { RegistrationRequest } from '@shared/types'

const defaultValues: RegistrationRequest = {
  email: '',
  password: '',
  username: '',
  firstName: '',
  lastName: '',
  midName: '',
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        resolve(result) // строка вида 'data:image/png;base64,iVBORw0...'
      } else {
        reject(new Error('Failed to convert file to base64'))
      }
    }

    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

const RegistrationPage: FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarBase64, setAvatarBase64] = useState<string>('')
  const { mutateAsync } = useUploadFile()
  const { mutate, status } = useRegistration()
  const form = useForm<Omit<RegistrationRequest, 'avatar'>>({
    mode: 'uncontrolled',
    initialValues: defaultValues,
    validate: zodResolver(registrationRequestScheme),
  })

  const handleChangeAvatar = async (file: File | null) => {
    if (!file) return

    setAvatar(file)
    setAvatarBase64(await fileToBase64(file))
  }

  const handleSuccess = async (values: Omit<RegistrationRequest, 'avatar'>) => {
    const uploadedFile = avatar ? await mutateAsync(avatar) : undefined

    mutate({
      ...values,
      avatar: uploadedFile?.id,
    })
  }

  return (
    <Fragment>
      <Title mb={'md'}>Регистрация</Title>
      <form onSubmit={form.onSubmit(handleSuccess)}>
        <Flex direction={'column'} gap={'md'}>
          <Flex direction={'column'} gap={'xs'}>
            {avatarBase64 && <Avatar src={avatarBase64} size={'xl'} />}
            <FileButton
              onChange={handleChangeAvatar}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
          </Flex>
          <TextInput
            key={form.key('email')}
            label={'Email'}
            placeholder={'your@email.com'}
            withAsterisk
            {...form.getInputProps('email')}
          />
          <TextInput
            key={form.key('username')}
            label={'Логин'}
            placeholder={'username'}
            withAsterisk
            {...form.getInputProps('username')}
          />
          <TextInput
            key={form.key('lastName')}
            label={'Фамилия'}
            placeholder={'Иванов'}
            withAsterisk
            {...form.getInputProps('lastName')}
          />
          <TextInput
            key={form.key('firstName')}
            label={'Имя'}
            placeholder={'Иван'}
            withAsterisk
            {...form.getInputProps('firstName')}
          />
          <TextInput
            key={form.key('midName')}
            label={'Отчество'}
            placeholder={'Иванович'}
            {...form.getInputProps('midName')}
          />
          <PasswordInput
            key={form.key('password')}
            label={'Пароль'}
            placeholder={'Qwerty@123'}
            withAsterisk
            {...form.getInputProps('password')}
          />
          <Flex
            direction={'row'}
            gap={'sm'}
            align={'center'}
            justify={'space-between'}
            flex={1}
          >
            <Anchor component={Link} to={'/authentication/login'}>
              Вход
            </Anchor>
            <Button type={'submit'} loading={status === 'pending'}>
              Зарегистрироваться
            </Button>
          </Flex>
        </Flex>
      </form>
    </Fragment>
  )
}

export default RegistrationPage
