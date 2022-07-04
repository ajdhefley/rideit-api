import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoasterImageEntity } from '../models/coaster-image.entity';

@Injectable()
export class CoasterImageService {
    constructor(
        @InjectRepository(CoasterImageEntity)
        private coasterImageRepository: Repository<CoasterImageEntity>
    ) { }

    findBy(CoasterId: number): Promise<CoasterImageEntity[]> {
        return this.coasterImageRepository.findBy({ CoasterId });
    }
}
