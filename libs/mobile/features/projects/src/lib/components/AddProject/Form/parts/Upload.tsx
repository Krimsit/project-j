import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { HelperText } from 'react-native-paper'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

import { UploadButton, UploadImage } from './common.styles'

import type { FC } from 'react'

export const Upload: FC = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()
  const value = getValues('image') ? String(getValues('image')) : ''
  const error = errors.image
  const [image, setImage] = useState<string>('')

  const handleChoosePhoto = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      selectionLimit: 1,
      base64: true,
    })

    if (!result.canceled) {
      if (result.assets?.[0].uri) {
        setValue('image', result.assets?.[0].uri)
        setImage(result.assets?.[0].uri)
      }
    }
  }

  useEffect(() => {
    setImage(value)
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
