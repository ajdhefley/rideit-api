import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewTagEntity } from './models/review-tag.entity';
import { ReviewEntity } from './models/review.entity';
import { ReviewTagService } from './services/review-tag.service';
import { ReviewResolver } from './services/review.resolver';
import { ReviewService } from './services/review.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReviewEntity, ReviewTagEntity])
    ],
    controllers: [
        ReviewsController
    ],
    providers: [
        ReviewService,
        ReviewTagService,
        ReviewResolver
    ]
})
export class ReviewsModule { }
