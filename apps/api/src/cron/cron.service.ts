import { Injectable, Inject } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { cronLogger } from '@core/loggers'
import { FilesService, UserService } from '@services'

@Injectable()
export class CronService {
  constructor(
    @Inject(FilesService) private readonly filesService: FilesService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCleanUnusedFiles() {
    cronLogger.log('Running cleanUnusedFiles cron task...')
    await this.filesService.cleanUnusedFiles(2)
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCleanAllUnusedFiles() {
    cronLogger.log('Running cleanAllUnusedFiles cron task...')
    await this.userService.deleteUnusedFiles()
  }
}
