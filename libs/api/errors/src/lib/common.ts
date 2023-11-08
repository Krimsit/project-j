import { HttpException, HttpStatus } from '@nestjs/common'

export class NotFoundExceptions extends HttpException {
  constructor(text = 'Not found', error?: unknown) {
    super(text, HttpStatus.NOT_FOUND, {
      cause: error as Error,
    })
  }
}
