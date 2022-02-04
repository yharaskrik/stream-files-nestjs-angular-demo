import { Injectable } from '@nestjs/common';
import { Message } from '@stream-files-nestjs-demo/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
