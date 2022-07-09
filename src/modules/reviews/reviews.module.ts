import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewEntity } from './models/review.entity';
import { ReviewResolver } from './services/review.resolver';
import { ReviewService } from './services/review.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReviewEntity])
    ],
    controllers: [
        ReviewsController
    ],
    providers: [
        ReviewService,
        ReviewResolver
    ]
})
export class ReviewsModule { }
