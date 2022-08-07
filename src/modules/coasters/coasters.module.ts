import { Module } from '@nestjs/common';
import { CoasterImageResolver } from './resolvers/coaster-image.resolver';
import { CoasterResolver } from './resolvers/coaster.resolver';
import { UsersModule } from '../users/users.module';
import { CoasterOutboundService } from '../../services/outbound/coaster-outbound.service';
import { CommentOutboundService } from '../../services/outbound/comment-outbound.service';
import { ReviewOutboundService } from '../../services/outbound/review-outbound.service';
import { HttpService } from '../../services/http.service';
import { Configuration } from '../../infrastructure/configuration';

@Module({
    imports: [
        UsersModule
    ],
    controllers: [

    ],
    providers: [
        Configuration,
        HttpService,
        CoasterOutboundService,
        CommentOutboundService,
        ReviewOutboundService,
        CoasterResolver,
        CoasterImageResolver
    ]
})
export class CoastersModule { }
