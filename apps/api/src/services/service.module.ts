import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@core/configs'
import { ModelsModule } from '@models'

import { FilesService } from './file.service'
import { UserService } from './user.service'
import { AuthService } from './auth.service'
import { ProjectService } from './project.service'

@Module({
  imports: [ModelsModule, JwtModule, ConfigModule],
  providers: [FilesService, UserService, AuthService, ProjectService],
  exports: [FilesService, UserService, AuthService, ProjectService],
})
export class ServicesModule {}
