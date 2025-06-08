import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ServicesModule } from '@services'

import { CronService } from './cron.service'

@Module({
  imports: [ScheduleModule.forRoot(), ServicesModule],
  providers: [CronService],
})
export class CronModule {}
