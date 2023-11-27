import { useState } from 'react'
import { IconButton, Text } from 'react-native-paper'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

import { Container, Title, Images, Image } from './Attachments.styles'

import type { FC } from 'react'

export const Attachments: FC = () => {
  const [images, setImages] = useState<string[]>([
    'https://fastly.picsum.photos/id/1021/700/700.jpg?hmac=ldJsatR-G17PNAnHdy7oFdi8EVQoiR3aa-Hd301-7OI',
  ])

  const handleChoosePhoto = () => {
    void launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
    }).then((result) => {
      if (!result.canceled) {
        if (result.assets?.[0].uri) {
          const newImages = result.assets?.map((item) => item.uri)
          const value = [...images, ...newImages]

          setImages(value)
        }
      }
    })
  }

  return (
    <Container>
      <Title>
        <Text variant={'bodyMedium'}>Attachments</Text>
        <IconButton icon={'plus'} onPress={handleChoosePhoto} />
      </Title>
      {images.length !== 0 && (
        <Images>
          {images.map((image, index) => (
            <Image
              key={`${image}_${index}`}
              source={{
                uri: image,
              }}
            />
          ))}
        </Images>
      )}
    </Container>
  )
}
