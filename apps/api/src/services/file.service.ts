import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'
import { filesLogger } from '@core/loggers'
import { File } from '@models'

import type { EnvConfig } from '@core/configs'
import type { FileDocument } from '@models'

export type UploadFileParams = {
  originalname: string
  mimetype: string
  buffer: Buffer
  size: number
  filename?: string
}

@Injectable()
export class FilesService {
  private s3: S3Client

  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    @Inject(ConfigService)
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    this.s3 = new S3Client({
      region: configService.get<string>('API_S3_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('API_S3_ACCESS_KEY_ID') ?? '',
        secretAccessKey:
          configService.get<string>('API_S3_SECRET_ACCESS_KEY') ?? '',
      },
      endpoint: configService.get<string>('API_S3_URL'),
      forcePathStyle: true,
    })
  }

  async uploadFile(file: UploadFileParams): Promise<FileDocument> {
    const key = `uploads/${uuidv4()}-${file.originalname}`

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.configService.get<string>('API_S3_BUCKET_NAME'),
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    )

    const url = `${this.configService.get<string>('API_S3_URL')}/${this.configService.get<string>('API_S3_BUCKET_NAME')}/${key}`
    const createdFile = new this.fileModel({
      filename: file.filename || file.originalname,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      s3Key: key,
      url,
      markedForDeletionAt: null,
    })

    return createdFile.save()
  }

  async findAllUnusedFiles(
    allUsedFileIds: Types.ObjectId[],
  ): Promise<FileDocument[]> {
    return this.fileModel.find({
      _id: { $nin: allUsedFileIds },
    })
  }

  async markFileForDeletion(
    fileId: Types.ObjectId,
  ): Promise<FileDocument | null> {
    return this.fileModel.findOneAndUpdate(
      { _id: fileId, markedForDeletionAt: null },
      { markedForDeletionAt: new Date() },
      { new: true },
    )
  }

  async deleteFile(file: FileDocument) {
    try {
      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: this.configService.get<string>('API_S3_BUCKET_NAME'),
          Key: file.s3Key,
        }),
      )
      await file.deleteOne()
    } catch (error) {
      filesLogger.error(`Failed to delete file ${file._id}: ${error}`)
    }
  }

  async cleanUnusedFiles(olderThanMinutes = 60) {
    const thresholdDate = new Date(Date.now() - olderThanMinutes * 60 * 1000)
    const filesToDelete = await this.fileModel.find({
      markedForDeletionAt: { $lte: thresholdDate },
    })

    for (const file of filesToDelete) {
      await this.deleteFile(file)
    }
  }
}
