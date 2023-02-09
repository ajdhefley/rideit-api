import { Controller, Body, Post, Param, Put } from '@nestjs/common';
import { CoasterOutboundService } from 'src/services/outbound/coaster-outbound.service';
import { CoasterImage } from '../models/coaster-image.model';
import { Coaster } from '../models/coaster.model';

@Controller('api/coaster')
export class CoasterController {
    constructor(
        private coasterService: CoasterOutboundService
    ) { }

    @Post()
    async createCoaster(@Body() coaster: Coaster) {
        return await this.coasterService.saveCoaster(coaster);
    }

    @Post(':coasterId/image')
    async createCoasterImage(@Param('coasterId') coasterId: number, @Body() coasterImage: CoasterImage) {
        return await this.coasterService.saveCoasterImage(coasterId, coasterImage);
    }

    @Put(`:coasterId/image`)
    async updateCoasterImage(@Param('coasterId') coasterId: number, @Body() coasterImage: CoasterImage) {
        return await this.coasterService.updateCoasterImage(coasterId, coasterImage);
    }
}