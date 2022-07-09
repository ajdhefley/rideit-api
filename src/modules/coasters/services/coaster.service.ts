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

    findAll() {
        return this.coasterRepository.find();
    }

    findLike(name: string) {
        return this.coasterRepository
            .createQueryBuilder('coaster')
            .where('coaster.Name LIKE :name', { name: `%${name}%` })
            .getMany();
    }

    findOneBy(url: string) {
        return this.coasterRepository.findOneBy({ url });
    }
}
