import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { envConfig } from '@core/configs'
import { mongoDBLogger } from '@core/loggers'
import { SecureModule } from '@secure'
import { ModelsModule } from '@models'
import { ServicesModule } from '@services'
import { ControllersModule } from '@controllers'

import type { EnvConfig } from '@core/configs'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvConfig>) => {
        const host = configService.get<string>('API_DATABASE_HOST')
        const port = configService.get<number>('API_DATABASE_PORT')
        const name = configService.get<string>('API_DATABASE_NAME')
        const user = configService.get<string>('API_DATABASE_USER')
        const pass = encodeURIComponent(
          configService.get<string>('API_DATABASE_PASSWORD') ?? '',
        )

        return {
          uri: `mongodb://${user}:${pass}@${host}:${port}/${name}?authSource=admin`,
          onConnectionCreate: (connection) => {
            connection.on('connected', () => {
              mongoDBLogger.log('Successfully connected to MongoDB')
            })

            connection.on('error', (error) => {
              mongoDBLogger.error(`MongoDB connection error: ${error}`)
            })
          },
        }
      },
    }),
    SecureModule,
    ModelsModule,
    ServicesModule,
    ControllersModule,
  ],
})
export class AppModule {}
