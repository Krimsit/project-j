import { Logger } from '@nestjs/common'

export const serverLogger = new Logger('Server')

export const mongoDBLogger = new Logger('MongoDB')
