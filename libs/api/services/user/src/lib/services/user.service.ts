import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  public getData = (): { message: string } => ({ message: 'Hello Test API' })
}
