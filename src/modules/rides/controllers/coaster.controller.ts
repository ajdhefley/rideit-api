import { Controller, Get } from '@nestjs/common';
import { CoasterService } from '../services/coaster.service';

@Controller()
export class CoasterController {
  constructor(private readonly coasterService: CoasterService) {}

  @Get()
  getHello(): string {
    return this.coasterService.getHello();
  }
}
