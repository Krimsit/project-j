import { join } from 'path'

import { ConfigModule, ConfigService, registerAs } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'

import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { ConfigServiceProps } from '@api/models'

export const mongodbConfig = registerAs('mongodb', () => {
  const {
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_DBNAME,
  } = process.env

  return {
    uri: `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}?authSource=admin&directConnection=true`,
  }
})

export const mongooseModule = MongooseModule.forRootAsync({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService<ConfigServiceProps>) => {
    const host = configService.get<string>('MONGODB_HOST')
    const port = configService.get<string>('MONGODB_PORT')
    const user = configService.get<string>('MONGODB_USERNAME')
    const pass = configService.get<string>('MONGODB_PASSWORD')
    const dbName = configService.get<string>('MONGODB_DBNAME')

    return {
      uri: `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin&directConnection=true`,
    }
  },
})

export const graphQLModule = NestGraphQLModule.forRootAsync<ApolloDriverConfig>(
  {
    driver: ApolloDriver,
    inject: [ConfigService],
    useFactory: (configService: ConfigService<ConfigServiceProps>) => ({
      autoSchemaFile: join(process.cwd(), 'schemas/schema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
      playground: true,
      debug: Boolean(configService.get('DEBUG')),
      uploads: false,
    }),
  },
)

export const configModule = ConfigModule.forRoot({
  load: [mongodbConfig],
  isGlobal: true,
})
