import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Coaster } from '../models/coaster.model';
import { CoasterService } from '../services/coaster.service';

@Controller('coasters')
export class CoasterController {
  constructor(private readonly coasterService: CoasterService) {}

  @Get()
  async getCoasters(@Req() req: Request, @Res() res: Response) {
    const result = await this.coasterService.getCoasters();
    return res.json(result);
  }

  @Get(':id')
  async getCoaster(@Req() req: Request, @Res() res: Response, @Param() params) {
    const result = await this.coasterService.getCoaster(params.id);
    return res.json(result);
  }
}
