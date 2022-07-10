import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewTagEntity } from '../models/review-tag.entity';

@Injectable()
export class ReviewTagService {
    constructor(
        @InjectRepository(ReviewTagEntity)
        private reviewTagRepository: Repository<ReviewTagEntity>
    ) { }

    async findBy(reviewId: number) {
        return this.reviewTagRepository.findBy({ reviewId });
    }
}
