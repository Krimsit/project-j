import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Title,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Divider,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { loginRequestScheme } from '@shared/types'
import { useLogin } from '@dto/auth'
import { GoogleAuthButton } from '@components'

import type { FC } from 'react'
import type { LoginRequest } from '@shared/types'

const defaultValues: LoginRequest = {
  email: '',
  password: '',
}

const RootPage: FC = () => {
  const { mutate, status } = useLogin()
  const form = useForm<LoginRequest>({
    mode: 'uncontrolled',
    initialValues: defaultValues,
    validate: zodResolver(loginRequestScheme),
  })

  const handleSuccess = (values: LoginRequest) => mutate(values)

  return (
    <Fragment>
      <Title mb={'md'}>Вход</Title>
      <form onSubmit={form.onSubmit(handleSuccess)}>
        <Flex direction={'column'} gap={'md'}>
          <TextInput
            key={form.key('email')}
            label={'Email'}
            placeholder={'your@email.com'}
            withAsterisk
            {...form.getInputProps('email')}
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
            <Anchor component={Link} to={'/authentication/registration'}>
              Регистрация
            </Anchor>
            <Button type={'submit'} loading={status === 'pending'}>
              Войти
            </Button>
          </Flex>
        </Flex>
      </form>
      <Divider my="lg" />
      <GoogleAuthButton />
    </Fragment>
  )
}

export default RootPage
