import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoasterEntity } from '../models/coaster.entity';

@Injectable()
export class CoasterService {
    constructor(
        @InjectRepository(CoasterEntity)
        private coasterRepository: Repository<CoasterEntity>
    ) { }

    findAll(): Promise<CoasterEntity[]> {
        return this.coasterRepository.find();
    }

    findLike(Name: string): Promise<CoasterEntity[]> {
        return this.coasterRepository
            .createQueryBuilder('coaster')
            .where('coaster.Name LIKE :name', { name: `%${Name}%` })
            .getMany();
    }

    findOneBy(Url: string): Promise<CoasterEntity> {
        return this.coasterRepository.findOneBy({ Url });
    }
}
