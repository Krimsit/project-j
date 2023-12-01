import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { HelperText } from 'react-native-paper'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

import { UploadButton, UploadImage } from './common.styles'

import type { FC } from 'react'
import type { ProjectForm } from '@shared/models'

export const Upload: FC = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<ProjectForm>()
  const value = getValues('image')
  const error = errors.image
  const [image, setImage] = useState<string>('')

  const handleChoosePhoto = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      selectionLimit: 1,
      base64: true,
    })

    if (!result.canceled) {
      if (result.assets?.[0]) {
        const { base64, uri, fileName } = result.assets[0]

        setValue('image', {
          base64: String(base64),
          filename: String(fileName),
        })
        setImage(uri)
      }
    }
  }

  useEffect(() => {
    const base64RegExp = RegExp(
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    )

    if (!value.base64) {
      setImage('')
    } else if (base64RegExp.test(value.base64)) {
      setImage(`data:image/jpeg;base64,${value.base64}`)
    } else {
      setImage(value.base64)
    }
  }, [value])

  if (!image) {
    return (
      <View>
        <HelperText type={'info'}>Image</HelperText>
        <UploadButton
          size={40}
          icon={'image'}
          mode={'outlined'}
          onPress={handleChoosePhoto}
        />
      </View>
    )
  }

  return (
    <View>
      <UploadImage
        source={{
          uri: image,
        }}
      />
      <HelperText type={'error'} visible={Boolean(error)}>
        {String(error?.message)}
      </HelperText>
    </View>
  )
}
