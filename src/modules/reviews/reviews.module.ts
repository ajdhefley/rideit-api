import { Module } from '@nestjs/common';
import { HttpService } from '../../services/http.service';
import { ReviewOutboundService } from '../../services/outbound/review-outbound.service';
import { UserOutboundService } from '../../services/outbound/user-outbound.service';
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
        ReviewOutboundService,
        UserOutboundService,
        ReviewResolver
    ]
})
export class ReviewsModule { }
