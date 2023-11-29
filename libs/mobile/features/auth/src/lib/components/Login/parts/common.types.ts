import type { InputModeOptions } from 'react-native/Libraries/Components/TextInput/TextInput'
import type { LoginForm } from '@shared/models'

export type TextFieldProps = {
  name: keyof LoginForm
  label: string
  placeholder: string
  secureTextEntry?: boolean
  inputMode?: InputModeOptions
}
