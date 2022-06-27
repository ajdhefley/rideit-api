import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoasterService } from '../services/coaster.service';

@Controller('coasters')
export class CoasterController {
  constructor(private readonly coasterService: CoasterService) {}

  @Get()
  async getCoasters(@Req() req: Request, @Res() res: Response) {
    const result = await this.coasterService.getCoasters();
    return res.json(result);
  }

  @Get(':url')
  async getCoaster(@Req() req: Request, @Res() res: Response, @Param() params) {
    const coaster = await this.coasterService.getCoasterByUrl(params.url);
    coaster.ImgList = await this.coasterService.getCoasterImages(coaster.CoasterId);
    return res.json(coaster);
  }
}
