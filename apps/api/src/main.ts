import { NestFactory } from '@nestjs/core'

import { serverLogger } from './core/loggers'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.API_WEBAPP_URL,
  })

  await app.listen(Number(process.env.API_PORT))

  serverLogger.log(`Server is running on: ${await app.getUrl()}`)
}

void bootstrap()
