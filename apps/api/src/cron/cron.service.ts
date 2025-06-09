import { Injectable, Inject } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { cronLogger } from '@core/loggers'
import {
  FilesService,
  UserService,
  ProjectService,
  TaskService,
} from '@services'

@Injectable()
export class CronService {
  constructor(
    @Inject(FilesService) private readonly filesService: FilesService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(ProjectService) private readonly projectService: ProjectService,
    @Inject(TaskService) private readonly taskService: TaskService,
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
    await this.projectService.deleteUnusedFiles()
    await this.taskService.deleteUnusedFiles()
  }
}
