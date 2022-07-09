import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewEntity } from './models/review.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReviewEntity])
    ],
    controllers: [
        ReviewsController
    ],
    providers: [
    ]
})
export class ReviewsModule { }
