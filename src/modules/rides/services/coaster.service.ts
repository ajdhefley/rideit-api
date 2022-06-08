import { Injectable } from '@nestjs/common';

@Injectable()
export class CoasterService {
  getHello(): string {
    return 'Hello World!';
  }
}
