import { useMutation } from '@tanstack/react-query'
import { filesEndpoints } from '@shared/api'
import { httpClient } from '@config'

import type { UploadFileResult } from '@shared/types'

const httpFile = (formData: FormData): Promise<UploadFileResult> =>
  httpClient
    .post(filesEndpoints.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data)

export const useUploadFile = () => {
  return useMutation<UploadFileResult, Error, File>({
    mutationKey: ['upload_file'],
    mutationFn: (file) => {
      const formData = new FormData()

      formData.append('file', file)

      return httpFile(formData)
    },
  })
}
