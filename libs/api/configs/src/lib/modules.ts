import { join } from 'path'

import { ConfigModule, ConfigService, registerAs } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'

import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { ConfigServiceProps } from '@api/models'

export const mongodbConfig = registerAs('mongodb', () => {
  const { MONGO_URI } = process.env

  return {
    uri: `${MONGO_URI}`,
  }
})

export const mongooseModule = MongooseModule.forRootAsync({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService<ConfigServiceProps>) => ({
    uri: configService.get('MONGO_URI'),
  }),
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
