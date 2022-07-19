import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { CoasterService } from '../services/coaster.service';

@Controller('coasters')
export class CoastersController {
    constructor(private readonly coasterService: CoasterService) { }

    @Get('test')
    async getCoasterByUrl(@Req() req: Request, @Res() res: Response) {
      res.status(200).end();
    }

    // @Get()
    // async getCoasters(@Req() req: Request, @Res() res: Response, @Query() query) {
    //   const coasters = await this.coasterService.findAll(query.filter);

    //   for (let coaster of coasters) {
    //     coaster.ImgList = await this.coasterService.getCoasterImages(coaster.CoasterId);
    //   }

    //   return res.json(coasters);
    // }

    // @Get(':url')
    // async getCoasterByUrl(@Req() req: Request, @Res() res: Response, @Param() params) {
    //   const coaster = await this.coasterService.getCoasterByUrl(params.url);
    //   coaster.ImgList = await this.coasterService.getCoasterImages(coaster.CoasterId);
    //   return res.json(coaster);
    // }
}
