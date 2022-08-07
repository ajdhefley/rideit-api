import { Module } from '@nestjs/common';
import { Configuration } from '../../infrastructure/configuration';
import { HttpService } from '../../services/http.service';
import { ReviewOutboundService } from '../../services/outbound/review-outbound.service';
import { UserOutboundService } from '../../services/outbound/user-outbound.service';
import { UsersModule } from '../users/users.module';
import { ReviewResolver } from './resolvers/review.resolver';

@Module({
    imports: [
        UsersModule
    ],
    controllers: [
        
    ],
    providers: [
        Configuration,
        HttpService,
        ReviewOutboundService,
        UserOutboundService,
        ReviewResolver
    ]
})
export class ReviewsModule { }
