import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../models/review.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private reviewRepository: Repository<ReviewEntity>
    ) { }

    async findBy(coasterUrl: string) {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.coaster', 'c')
            .where('c.Url = :coasterUrl', { coasterUrl })
            .getMany();
    }
}
