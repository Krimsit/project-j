import {
  Controller,
  Inject,
  Post,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { filesEndpoints } from '@shared/api'
import { FilesService } from '@services'

import type { UploadFileResult } from '@shared/types'

@Controller()
export class FilesController {
  constructor(
    @Inject(FilesService) private readonly filesService: FilesService,
  ) {}

  @Post(filesEndpoints.upload)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResult> {
    if (!file) {
      throw new NotFoundException('File is required')
    }

    const uploadedFile = await this.filesService.uploadFile(file)

    return {
      id: uploadedFile.id,
      filename: uploadedFile.filename,
      originalName: uploadedFile.originalName,
      size: uploadedFile.size,
      mimeType: uploadedFile.mimeType,
      url: uploadedFile.url,
    }
  }
}
