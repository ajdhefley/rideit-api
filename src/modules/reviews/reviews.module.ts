import { Module } from '@nestjs/common';
import { HttpService } from '../../services/http.service';
import { UsersModule } from '../users/users.module';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewResolver } from './resolvers/review.resolver';

@Module({
    imports: [
        UsersModule
    ],
    controllers: [
        ReviewsController
    ],
    providers: [
        HttpService,
        ReviewResolver
    ]
})
export class ReviewsModule { }
